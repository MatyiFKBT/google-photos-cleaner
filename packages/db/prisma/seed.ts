import { PrismaClient, User } from '@prisma/client';
import { hash } from 'argon2';
const prisma = new PrismaClient();

async function main() {

	const password = await hash('matyi1');
	const user = await prisma.user.create({
		data: {
			name: 'matyi',
			username: 'matyi',
			email: 'matyi@localhost.com',
			hashed_password: password,
			role: 'ADMIN',
		}
	});

}

main()
	.then(() => console.log('Seeded successfully'))
	.catch(e => console.error(e))