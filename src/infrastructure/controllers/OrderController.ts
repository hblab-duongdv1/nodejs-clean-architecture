import { Request, Response } from 'express';
import { CreateOrderUseCase } from '../../application/use-cases/order/CreateOrderUseCase';
import { UpdateOrderStatusUseCase } from '../../application/use-cases/order/UpdateOrderStatusUseCase';
import { OrderRepository } from '../repositories/OrderRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { OrderStatus } from '../../domain/entities/Order';

export class OrderController {
  private createOrderUseCase: CreateOrderUseCase;
  private updateOrderStatusUseCase: UpdateOrderStatusUseCase;

  constructor() {
    const orderRepository = new OrderRepository();
    const productRepository = new ProductRepository();
    this.createOrderUseCase = new CreateOrderUseCase(orderRepository, productRepository);
    this.updateOrderStatusUseCase = new UpdateOrderStatusUseCase(orderRepository);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, items } = req.body;
      const order = await this.createOrderUseCase.execute({ userId, items });
      return res.status(201).json({
        orderId: order.id,
        message: 'Order created successfully'
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!Object.values(OrderStatus).includes(status)) {
        return res.status(400).json({ message: 'Invalid order status' });
      }

      const order = await this.updateOrderStatusUseCase.execute(
        parseInt(id),
        status as OrderStatus
      );
      return res.json(order);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
} 