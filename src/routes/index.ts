import { Router } from 'express';
import usersController from '../controllers/usersController';

const router = Router();

router.route('/create').post(usersController.createUser);
router.route('/read/:id').get(usersController.readUser);
router.route('/update/:id').put(usersController.updateUser);
router.route('/delete/:id').delete(usersController.deleteUser);

export default router;
