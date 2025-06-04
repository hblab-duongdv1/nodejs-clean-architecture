import { DataSource } from "typeorm";
import { User } from "../../../domain/entities/User";
import { Product } from "../../../domain/entities/Product";
import { Order, OrderItem } from "../../../domain/entities/Order";
import { config } from "dotenv";

config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "clean_architecture_db",
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  entities: [User, Product, Order, OrderItem],
  migrations: ["src/infrastructure/database/migrations/*.ts"],
  subscribers: [],
});