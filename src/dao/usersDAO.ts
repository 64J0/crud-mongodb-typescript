import { Collection, MongoClient, ObjectId } from 'mongodb';
import IUser from '../@types/user';

let users: Collection = null;

export default class UsersDAO {
  static async injectDB(conn: MongoClient): Promise<null> {
    try {
      users = await conn
        .db(process.env.DATABASE_NAME)
        .collection('user');
    } catch (e) {
      console.error(`Unable to establish collection handles in usersDAO: ${e}`);
    } finally {
      return null;
    }
  };

  static async getUserByEmail(email: string): Promise<IUser | null> {
    return await users.findOne({ email });
  }

  static async getUserById(id: string): Promise<IUser | null> {
    const _id = new ObjectId(id);
    return await users.findOne({ _id });
  }

  static async addUser(userInfo: IUser): Promise<IUser | null> {
    try {
      const newUser = await users.insertOne(
        { ...userInfo },
        { w: 'majority' }
      );
      return ({ _id: newUser.insertedId, ...userInfo });
    } catch (e) {
      console.error(`Error occurred while adding new user, ${e}.`);
      return null;
    }
  }

  static async deleteUser(email: string): Promise<any> {
    try {
      await users.deleteOne({ email });
      // Verify
      const user = await this.getUserByEmail(email);
      if (!user._id) {
        return { success: true };
      } else {
        console.error('Deletion unsuccessful');
        return { error: 'Deletion unsuccessful' };
      }
    } catch (e) {
      console.error(`Error occurred while deleting user, ${e}`);
      return { error: e };
    }
  }

  static async updateUser(email: string, userInfo: IUser): Promise<IUser | null> {
    try {
      const updateResponse = await users.updateOne(
        { email },
        { $set: { ...userInfo } }
      );

      if (updateResponse.matchedCount === 0) {
        console.error('No user found with that email');
        return null;
      }

      return ({
        _id: String(updateResponse.upsertedId),
        ...userInfo
      });
    } catch (e) {
      console.error(
        `An error occurred while updating this user's preferences, ${e}`,
      );
      return null;
    }
  }
}
