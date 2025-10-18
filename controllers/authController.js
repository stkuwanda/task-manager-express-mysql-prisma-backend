import { prismaClient } from '../routes/index.js';

export const RegisterController = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ error: { message: 'Missing credentials!' } });
		}

		const existingUser = await prismaClient.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return res
				.status(400)
				.json({ error: { message: 'User already exists!' } });
		}

		const user = await prismaClient.user.create({
			data: { name, email, password },
		});

		res.status(201).json({ message: 'User registered successfully.', user });
	} catch (err) {
		res.status(500).json({ error: { message: 'Internal server error.' } });
	}
};
