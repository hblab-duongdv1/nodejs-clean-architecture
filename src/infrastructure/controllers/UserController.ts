import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/user/CreateUserUseCase';
import { GetAllUsersUseCase } from '../../application/use-cases/user/GetAllUsersUseCase';
import { UserRepository } from '../repositories/UserRepository';

export class UserController {
  private createUserUseCase: CreateUserUseCase;
  private getAllUsersUseCase: GetAllUsersUseCase;

  constructor() {
    const userRepository = new UserRepository();
    this.createUserUseCase = new CreateUserUseCase(userRepository);
    this.getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, name, password } = req.body;
      const user = await this.createUserUseCase.execute({ email, name, password, orders: [] });
      return res.status(201).json(user);
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      console.log("req", req);
      const users = await this.getAllUsersUseCase.execute();
      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
} 