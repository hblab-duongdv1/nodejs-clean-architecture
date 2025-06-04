import { AppDataSource } from "./config/typeorm.config";

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Error during database initialization:", error);
    throw error;
  }
};

export const getDataSource = () => AppDataSource; 