import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class InitialSeed1709123456792 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create admin user
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await queryRunner.query(`
            INSERT INTO users (name, email, password)
            VALUES ('Admin User', 'admin@example.com', '${hashedPassword}')
        `);

        // Create some products
        await queryRunner.query(`
            INSERT INTO products (name, description, price, stock)
            VALUES 
                ('Laptop', 'High-performance laptop with 16GB RAM', 999.99, 50),
                ('Smartphone', 'Latest model with 128GB storage', 699.99, 100),
                ('Headphones', 'Noise-cancelling wireless headphones', 199.99, 75),
                ('Tablet', '10-inch tablet with 64GB storage', 399.99, 30)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM products`);
        await queryRunner.query(`DELETE FROM users`);
    }
} 