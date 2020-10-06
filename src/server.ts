import express from 'express';

import routes from './routes';
import dbExecute from './database';

const app = express();

dbExecute();
app.use(routes);

const port = process.env.PORT || 3333;
const executionMessage = () => console.log(`Server running on port ${port}.`);
app.listen(port, executionMessage);
