import { Router } from 'express';
import { getUserById, getOrdersByUserId, getOrdersSpentByUserId } from './handlers';

const usersRouter = Router();

usersRouter.get('/:id', getUserById);

usersRouter.get('/:id/orders', getOrdersByUserId);

usersRouter.get('/:id/orders/spent', getOrdersSpentByUserId);

export default usersRouter;
