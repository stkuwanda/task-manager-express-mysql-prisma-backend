import { prismaClient } from '../prisma-client.js';

export const CreateTaskController = async (req, res) => {
	try {
		const { title, description } = req.body;

		if (!title || !description) {
			return res.status(400).json({ error: { message: 'Missing fields!' } });
		}

		const task = await prismaClient.task.create({
			data: {
				title,
				description,
				userId: req.user.userId,
			},
		});

		res.status(201).json({ message: 'Task created successfully.', task });
	} catch (err) {
		return res
			.status(500)
			.json({ error: { message: 'Internal server error.' } });
	}
};
