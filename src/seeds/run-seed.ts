import { Seed } from "./index";
import { AppDataSource } from "../database/data-source";

async function runSeeds() {
    try {
        console.log("Initializing database connection...");
        await AppDataSource.initialize();
        console.log("Database connection established successfully");

        console.log("\nStarting seed process...");
        await Seed.run(AppDataSource);
        console.log("\nSeed process completed successfully");

        process.exit(0);
    } catch (error) {
        console.error("\nError during seed execution:", error);
        process.exit(1);
    }
}

runSeeds();
