import { Order, OrderStatus } from '../../../domain/entities/Order';
import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';

export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderId: number, status: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }

    return this.orderRepository.updateStatus(orderId, status);
  }
} 