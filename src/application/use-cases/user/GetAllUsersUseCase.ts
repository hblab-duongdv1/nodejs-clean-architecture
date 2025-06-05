import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }
} 