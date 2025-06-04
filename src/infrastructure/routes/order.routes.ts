import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

const router = Router();
const orderController = new OrderController();

router.post('/orders', orderController.create.bind(orderController));
router.patch('/orders/:id/status', orderController.updateStatus.bind(orderController));

export default router; 