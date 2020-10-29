import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import usersRoutes from '../routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.env.NODE_ENV !== 'prod' && app.use(morgan('dev'));

// Rotas
app.get('/', (request: Request, response: Response) => {
  return response.status(200).json({
    message: 'Hello world'
  });
});
app.use(usersRoutes);

export default app;
