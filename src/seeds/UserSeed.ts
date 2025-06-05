import { DataSource } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "../domain/entities/User";

export class UserSeed {
    public static async run(dataSource: DataSource): Promise<void> {
        const userRepository = dataSource.getRepository(User);

        const users = [
            {
                email: "admin@company.com",
                name: "System Administrator",
                password: "Admin@123"
            },
            {
                email: "manager@company.com",
                name: "Sales Manager",
                password: "Manager@123"
            },
            {
                email: "john.smith@company.com",
                name: "John Smith",
                password: "User@123"
            },
            {
                email: "sarah.johnson@company.com",
                name: "Sarah Johnson",
                password: "User@123"
            },
            {
                email: "michael.brown@company.com",
                name: "Michael Brown",
                password: "User@123"
            }
        ];

        console.log('Starting user seed...');
        let createdCount = 0;
        let skippedCount = 0;

        for (const userData of users) {
            const existingUser = await userRepository.findOne({
                where: { email: userData.email }
            });

            if (!existingUser) {
                const user = new User();
                Object.assign(user, {
                    ...userData,
                    password: await bcrypt.hash(userData.password, 10)
                });
                await userRepository.save(user);
                createdCount++;
                console.log(`Created user: ${userData.email}`);
            } else {
                skippedCount++;
                console.log(`Skipped existing user: ${userData.email}`);
            }
        }

        console.log(`User seed completed. Created: ${createdCount}, Skipped: ${skippedCount}`);
    }
}
