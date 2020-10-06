import { MongoClient } from 'mongodb';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const client = new MongoClient(
  process.env.DATABASE_CONNECTION_STRING,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

async function connect() {
  try {
    await client.connect();

    await client.db("studyMongodb").command({ ping: 1 });
    console.log('connected successfully to server');
  } catch (error) {
    // TODO
    console.error(error);
  } finally {
    await client.close();
  }
}

export default connect;