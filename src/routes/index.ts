import { Router } from 'express';
import usersController from '../controllers/usersController';

const router = Router();

router.route('/create').post(usersController.create);
//routes.get('/:email', usersController.read);
//routes.put('/:email', usersController.update);
//routes.delete('/:email', usersController.delete);

export default router;
