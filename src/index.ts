import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { AppDataSource } from './infrastructure/database/data-source';
import userRoutes from './infrastructure/routes/user.routes';
import orderRoutes from './infrastructure/routes/order.routes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', orderRoutes);

// Database connection and server start
const PORT = process.env.PORT || 8080;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  }); 