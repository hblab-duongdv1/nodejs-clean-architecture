import { AppDataSource } from "../data-source";
import { Seed } from "./index";

AppDataSource.initialize()
    .then(async () => {
        console.log("Running seeds...");
        await Seed.run(AppDataSource);
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error during seed execution:", error);
        process.exit(1);
    }); 