import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { prismaClient } from '../prisma-client.js';

dotenv.config();

const SALT_ROUNDS = 10;

const usersData = [
	{ name: 'User One', email: 'user1@example.com', password: 'password1' },
	{ name: 'User Two', email: 'user2@example.com', password: 'password2' },
	{ name: 'User Three', email: 'user3@example.com', password: 'password3' },
	{ name: 'User Four', email: 'user4@example.com', password: 'password4' },
];

async function main() {
	for (const u of usersData) {
		const hashed = await bcrypt.hash(u.password, SALT_ROUNDS);

		// Upsert user so the seed is idempotent
		const user = await prismaClient.user.upsert({
			where: { email: u.email },
			update: { name: u.name, password: hashed },
			create: { name: u.name, email: u.email, password: hashed },
		});

		// Ensure the user has 10 tasks. If they already have some, only create the missing ones.
		const existingCount = await prismaClient.task.count({
			where: { userId: user.id },
		});
		const tasksToCreate = [];
		for (let i = existingCount + 1; i <= 10; i++) {
			tasksToCreate.push({
				title: `Task ${i} for ${user.name}`,
				description: `Auto-generated task ${i} for ${user.email}`,
				completed: false,
				userId: user.id,
			});
		}

		if (tasksToCreate.length > 0) {
			await prismaClient.task.createMany({ data: tasksToCreate });
			console.log(`Created ${tasksToCreate.length} tasks for ${user.email}`);
		} else {
			console.log(`User ${user.email} already has ${existingCount} tasks`);
		}
	}

	console.log('Seeding complete.');
}

main()
	.then(() => prismaClient.$disconnect())
	.catch((e) => {
		console.error('Seed error:', e);
		prismaClient.$disconnect();
		process.exit(1);
	});
