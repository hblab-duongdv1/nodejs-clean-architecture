import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/user/CreateUserUseCase';
import { UserRepository } from '../repositories/UserRepository';

export class UserController {
  private createUserUseCase: CreateUserUseCase;

  constructor() {
    const userRepository = new UserRepository();
    this.createUserUseCase = new CreateUserUseCase(userRepository);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, name, password } = req.body;
      const user = await this.createUserUseCase.execute({ email, name, password });
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
} 