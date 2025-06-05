import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../domain/entities/User";
import { Order, OrderItem } from "../../domain/entities/Order";
import { Product } from "../../domain/entities/Product";
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  logging: process.env.DB_LOGGING === "true",
  entities: [User, Order, OrderItem, Product],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
}); 