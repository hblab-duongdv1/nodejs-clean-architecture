import { CreateOrderUseCase } from '../CreateOrderUseCase';
import { IOrderRepository } from '../../../../domain/repositories/IOrderRepository';
import { IProductRepository } from '../../../../domain/repositories/IProductRepository';
import { Order, OrderStatus } from '../../../../domain/entities/Order';
import { Product } from '../../../../domain/entities/Product';

describe('CreateOrderUseCase', () => {
  let createOrderUseCase: CreateOrderUseCase;
  let mockOrderRepository: jest.Mocked<IOrderRepository>;
  let mockProductRepository: jest.Mocked<IProductRepository>;

  beforeEach(() => {
    mockOrderRepository = {
      findById: jest.fn(),
      findByUserId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateStatus: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn()
    };

    mockProductRepository = {
      findById: jest.fn(),
      findByName: jest.fn(),
      updateStock: jest.fn(),
      findAll: jest.fn()
    };

    createOrderUseCase = new CreateOrderUseCase(
      mockOrderRepository,
      mockProductRepository
    );
  });

  it('should create an order successfully', async () => {
    // Mock product data
    const mockProduct = new Product();
    mockProduct.id = 1;
    mockProduct.name = 'Test Product';
    mockProduct.price = 10;
    mockProduct.stock = 5;

    // Mock repositories
    mockProductRepository.findById.mockResolvedValue(mockProduct);
    mockProductRepository.updateStock.mockResolvedValue(mockProduct);

    const mockOrder = new Order();
    mockOrder.id = 1;
    mockOrder.status = OrderStatus.PENDING;
    mockOrder.totalAmount = 20;
    mockOrderRepository.create.mockResolvedValue(mockOrder);

    // Test data
    const orderData = {
      userId: 1,
      items: [
        {
          productId: 1,
          quantity: 2
        }
      ]
    };

    // Execute use case
    const result = await createOrderUseCase.execute(orderData);

    // Assertions
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.status).toBe(OrderStatus.PENDING);
    expect(result.totalAmount).toBe(20);
    expect(mockProductRepository.findById).toHaveBeenCalledWith(1);
    expect(mockProductRepository.updateStock).toHaveBeenCalledWith(1, 2);
    expect(mockOrderRepository.create).toHaveBeenCalled();
  });

  it('should throw error when product not found', async () => {
    mockProductRepository.findById.mockResolvedValue(null);

    const orderData = {
      userId: 1,
      items: [
        {
          productId: 999,
          quantity: 1
        }
      ]
    };

    await expect(createOrderUseCase.execute(orderData)).rejects.toThrow(
      'Product with ID 999 not found'
    );
  });

  it('should throw error when insufficient stock', async () => {
    const mockProduct = new Product();
    mockProduct.id = 1;
    mockProduct.name = 'Test Product';
    mockProduct.price = 10;
    mockProduct.stock = 1;

    mockProductRepository.findById.mockResolvedValue(mockProduct);

    const orderData = {
      userId: 1,
      items: [
        {
          productId: 1,
          quantity: 2
        }
      ]
    };

    await expect(createOrderUseCase.execute(orderData)).rejects.toThrow(
      'Insufficient stock for product Test Product'
    );
  });
}); 