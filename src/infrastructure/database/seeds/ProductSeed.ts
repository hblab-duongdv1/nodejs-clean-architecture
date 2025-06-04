import { DataSource } from "typeorm";
import { Product } from "../../../domain/entities/Product";

export class ProductSeed {
    public static async run(dataSource: DataSource): Promise<void> {
        const productRepository = dataSource.getRepository(Product);

        const products = [
            {
                name: "Laptop Dell XPS 13",
                price: 1299.99,
                stock: 50
            },
            {
                name: "iPhone 15 Pro",
                price: 999.99,
                stock: 100
            },
            {
                name: "Samsung 4K Smart TV",
                price: 799.99,
                stock: 30
            },
            {
                name: "Sony WH-1000XM5",
                price: 399.99,
                stock: 75
            },
            {
                name: "Apple Watch Series 9",
                price: 399.99,
                stock: 60
            }
        ];

        for (const productData of products) {
            const existingProduct = await productRepository.findOne({
                where: { name: productData.name }
            });

            if (!existingProduct) {
                const product = new Product();
                Object.assign(product, productData);
                await productRepository.save(product);
                console.log(`Created product: ${productData.name}`);
            }
        }
    }
} 