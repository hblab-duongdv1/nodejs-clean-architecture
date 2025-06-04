import { Order, OrderItem, OrderStatus } from '../../../domain/entities/Order';
import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';
import { IProductRepository } from '../../../domain/repositories/IProductRepository';

interface CreateOrderDTO {
  userId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
}

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository
  ) {}

  async execute(data: CreateOrderDTO): Promise<Order> {
    // Validate products and check stock
    const orderItems: OrderItem[] = [];
    let totalAmount = 0;

    for (const item of data.items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }

      // Update stock
      await this.productRepository.updateStock(product.id, item.quantity);

      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.productId = product.id;
      orderItem.quantity = item.quantity;
      orderItem.price = product.price;
      orderItems.push(orderItem);

      totalAmount += product.price * item.quantity;
    }

    const order = new Order();
    Object.assign(order, {
      userId: data.userId,
      items: orderItems,
      totalAmount,
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return this.orderRepository.create(order);
  }
} 