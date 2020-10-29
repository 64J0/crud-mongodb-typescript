import { MongoClient } from 'mongodb';
import UsersDAO from '../dao/usersDAO';

const mongoConnect = async (): Promise<void> => {
  try {
    const client = await MongoClient.connect(
      process.env.DATABASE_CONNECTION_STRING,
      {
        wtimeout: 1000,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    await UsersDAO.injectDB(client);
    return console.log('Database connected');
  } catch (err) {
    console.error(`Database can't connect. ${err.stack}`);
    return process.exit(1);
  }
}

export default mongoConnect;