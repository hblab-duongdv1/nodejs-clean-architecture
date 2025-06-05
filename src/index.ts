import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './database/data-source';
import userRoutes from './infrastructure/routes/user.routes';
import orderRoutes from './infrastructure/routes/order.routes';
import { swaggerSpec } from '../docs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  "origin": "*",
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/', (_, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

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
      console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
