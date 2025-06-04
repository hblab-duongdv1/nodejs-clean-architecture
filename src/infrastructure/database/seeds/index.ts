import { DataSource } from "typeorm";
import { UserSeed } from "./UserSeed";
import { ProductSeed } from "./ProductSeed";

export class Seed {
    public static async run(dataSource: DataSource): Promise<void> {
        try {
            console.log('Running seeds...');
            
            await UserSeed.run(dataSource);
            await ProductSeed.run(dataSource);
            
            console.log('Seeds completed successfully');
        } catch (error) {
            console.error('Error running seeds:', error);
            throw error;
        }
    }
}