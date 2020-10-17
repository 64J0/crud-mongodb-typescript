import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsersDAO from '../dao/usersDAO';
import IUser from '../@types/user';

import { Request, Response } from 'express';

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
}

export class User {
  name;
  email;
  password;

  constructor({ name, email, password }: IUser) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  toJson() {
    return ({
      name: this.name,
      email: this.email
    });
  }

  async comparePassword(plainText: string) {
    return await bcrypt.compare(plainText, this.password);
  }

  encoded() {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
        ...this.toJson()
      },
      process.env.SECRET_KEY
    )
  }

  static async decoded(userJwt: string) {
    return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res: IUser) => {
      if (error) {
        return { error };
      }
      return new User(res);
    })
  }
}

export default class UserController {
  static async create(request: Request, response: Response): Promise<Response> {
    try {
      const userFromBody = request.body;

      const userInfo = {
        ...userFromBody,
        password: await hashPassword(userFromBody.password)
      };

      const insertResult = await UsersDAO.addUser(userInfo);

      if (!insertResult._id) {
        throw new Error('Internal error, please try again later');
      }

      const user = new User(insertResult);

      return response.status(200).json({
        auth_token: user.encoded(),
        user: user.toJson()
      });
    } catch (e) {
      console.log(`An error has ocurred and the user couldn't be create: ${e}`);
      return response.status(500).json({ error: e });
    }
  }
};