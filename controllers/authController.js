import { prismaClient } from '../routes/index.js';
import { compareSync, hashSync } from 'bcrypt';

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

		const hashedPassword = hashSync(password, 10);

		const user = await prismaClient.user.create({
			data: { name, email, password: hashedPassword },
		});

		res.status(201).json({ message: 'User registered successfully.', user });
	} catch (err) {
		res.status(500).json({ error: { message: 'Internal server error.' } });
	}
};

export const LoginController = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ error: { message: 'Missing credentials!' } });
		}

		const existingUser = await prismaClient.user.findUnique({
			where: { email },
		});

		if (!existingUser) {
			return res.status(404).json({ error: { message: 'Not found!' } });
		}

		const isPasswordValid = compareSync(password, existingUser.password);

		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ error: { message: 'Invalid credentials!' } });
		}

		res.status(200).json({ message: 'Login successful.', user: existingUser });
	} catch (err) {
		res.status(500).json({ error: { message: 'Internal server error.' } });
	}
};
