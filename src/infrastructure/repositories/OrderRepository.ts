import { Repository } from "typeorm";
import { Order, OrderStatus } from "../../domain/entities/Order";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { AppDataSource } from "../../database/data-source";

export class OrderRepository implements IOrderRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = AppDataSource.getRepository(Order);
  }

  async findById(id: number): Promise<Order | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['user', 'items']
    });
  }

  async findByUserId(userId: number): Promise<Order[]> {
    return this.repository.find({
      where: { userId },
      relations: ['items']
    });
  }

  async create(order: Order): Promise<Order> {
    return this.repository.save(order);
  }

  async update(id: number, orderData: Partial<Order>): Promise<Order> {
    await this.repository.update(id, orderData);
    const updatedOrder = await this.findById(id);
    if (!updatedOrder) {
      throw new Error('Order not found');
    }
    return updatedOrder;
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order> {
    await this.repository.update(id, { status });
    const updatedOrder = await this.findById(id);
    if (!updatedOrder) {
      throw new Error('Order not found');
    }
    return updatedOrder;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<Order[]> {
    return this.repository.find({
      relations: ['user', 'items']
    });
  }
}
