import { DataSource } from "typeorm";
import { Product } from "../domain/entities/Product";

export class ProductSeed {
    public static async run(dataSource: DataSource): Promise<void> {
        const productRepository = dataSource.getRepository(Product);

        const products = [
            {
                name: "MacBook Pro 16-inch",
                description: "Latest Apple MacBook Pro with M3 Pro chip, 16GB RAM, 512GB SSD",
                price: 2499.99,
                stock: 25
            },
            {
                name: "iPhone 15 Pro Max",
                description: "Apple's flagship smartphone with A17 Pro chip, 256GB storage",
                price: 1199.99,
                stock: 50
            },
            {
                name: "Sony WH-1000XM5",
                description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
                price: 399.99,
                stock: 40
            },
            {
                name: "Samsung 65\" QLED 4K TV",
                description: "Smart TV with Quantum HDR, Game Mode, and built-in Alexa",
                price: 1499.99,
                stock: 15
            },
            {
                name: "Apple Watch Series 9",
                description: "GPS + Cellular, Always-On Retina display, Heart Rate Monitor",
                price: 499.99,
                stock: 35
            },
            {
                name: "iPad Pro 12.9-inch",
                description: "M2 chip, 256GB storage, Wi-Fi + Cellular, ProMotion display",
                price: 1099.99,
                stock: 20
            },
            {
                name: "AirPods Pro 2nd Gen",
                description: "Active Noise Cancellation, Spatial Audio, MagSafe Charging Case",
                price: 249.99,
                stock: 60
            }
        ];

        console.log('Starting product seed...');
        let createdCount = 0;
        let skippedCount = 0;

        for (const productData of products) {
            const existingProduct = await productRepository.findOne({
                where: { name: productData.name }
            });

            if (!existingProduct) {
                const product = new Product();
                Object.assign(product, productData);
                await productRepository.save(product);
                createdCount++;
                console.log(`Created product: ${productData.name}`);
            } else {
                skippedCount++;
                console.log(`Skipped existing product: ${productData.name}`);
            }
        }

        console.log(`Product seed completed. Created: ${createdCount}, Skipped: ${skippedCount}`);
    }
}
