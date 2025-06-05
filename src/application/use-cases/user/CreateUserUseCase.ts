import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = new User();
    Object.assign(user, {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return this.userRepository.create(user);
  }
}