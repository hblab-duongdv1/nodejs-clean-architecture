import { Repository } from "typeorm";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppDataSource } from "../../database/data-source";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.repository.update(id, userData);
    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
