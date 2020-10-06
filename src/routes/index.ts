import { Router, Request, Response } from 'express';
import readAllDocuments from '../controllers/read';

const routes = Router();

routes.get('/:schemaName', (request: Request, response: Response) => {
  const { schemaName } = request.params;
  console.log(schemaName);
  const dbInfo = readAllDocuments({ schemaName });
  return response.json(dbInfo);
});

routes.post('/', (request: Request, response: Response) => {
  const { name, email } = request.body;

  return response.json({ name, email });
});

routes.put('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  const { name, email } = request.body;

  return response.json({ id, name, email });
});

routes.delete('/:id', (request: Request, response: Response) => {
  const { id } = request.params;

  return response.json({ id });
});

export default routes;
