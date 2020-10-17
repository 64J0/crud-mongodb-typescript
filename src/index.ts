import app from './server';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import UsersDAO from './dao/usersDAO';

dotenv.config();

const port = process.env.PORT || 3333;
const executionMessage = () => {
  return console.log(`Server running on port ${port}.`);
};

MongoClient.connect(
  process.env.DATABASE_CONNECTION_STRING,
  {
    wtimeout: 2500,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(async (client) => {
    await UsersDAO.injectDB(client);
    app.listen(port, executionMessage);
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
