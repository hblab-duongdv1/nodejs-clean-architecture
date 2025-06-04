import { Order, OrderStatus } from '../entities/Order';

export interface IOrderRepository {
  findById(id: number): Promise<Order | null>;
  findByUserId(userId: number): Promise<Order[]>;
  create(order: Order): Promise<Order>;
  update(id: number, order: Partial<Order>): Promise<Order>;
  updateStatus(id: number, status: OrderStatus): Promise<Order>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Order[]>;
} 