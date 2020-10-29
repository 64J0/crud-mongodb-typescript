import app from './server/server';
import dotenv from 'dotenv';
import mongoConnect from './database/mongoConnect';

dotenv.config();

const port = process.env.PORT || 3333;
const executionMessage = () => {
  return console.log(`Server running on port ${port}.`);
};

mongoConnect()
  .then(() => {
    return app.listen(port, executionMessage);
  })
  .catch((err) => {
    console.error(`Server failed to run. ${err}`);
    return process.exit(1);
  });
