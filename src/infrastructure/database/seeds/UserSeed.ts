import { DataSource } from "typeorm";
import { User } from "../../../domain/entities/User";
import * as bcrypt from 'bcrypt';

export class UserSeed {
    public static async run(dataSource: DataSource): Promise<void> {
        const userRepository = dataSource.getRepository(User);

        const users = [
            {
                email: "john.doe@example.com",
                name: "John Doe",
                password: "password123"
            },
            {
                email: "jane.smith@example.com",
                name: "Jane Smith",
                password: "password123"
            },
            {
                email: "admin@example.com",
                name: "Admin User",
                password: "admin123"
            }
        ];

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
                console.log(`Created user: ${userData.email}`);
            }
        }
    }
} 