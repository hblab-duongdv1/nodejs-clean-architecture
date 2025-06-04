import { Repository } from "typeorm";
import { Product } from "../../domain/entities/Product";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { AppDataSource } from "../database/data-source";

export class ProductRepository implements IProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async findById(id: number): Promise<Product | null> {
    return this.repository.findOneBy({ id });
  }

  async findByName(name: string): Promise<Product | null> {
    return this.repository.findOneBy({ name });
  }

  async updateStock(id: number, quantity: number): Promise<Product> {
    const product = await this.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    product.stock -= quantity;
    return this.repository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find();
  }
} 