import { Product } from '../entities/Product';

export interface IProductRepository {
  findById(id: number): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  updateStock(id: number, quantity: number): Promise<Product>;
  findAll(): Promise<Product[]>;
} 