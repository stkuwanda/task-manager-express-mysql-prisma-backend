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

export const UpdateTaskController = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description } = req.body;

		if (!title || !description) {
			return res.status(400).json({ error: { message: 'Missing fields!' } });
		}

		const taskId = await prismaClient.task.findUnique({
			where: { id: Number(id) },
		});

		if (!taskId) {
			return res.status(404).json({ error: { message: 'Not found!' } });
		}

		const updatedTask = await prismaClient.task.update({
			where: { id: Number(id) },
			data: { title, description },
		});

		res
			.status(200)
			.json({ message: 'Task updated successfully.', task: updatedTask });
	} catch (err) {
		return res
			.status(500)
			.json({ error: { message: 'Internal server error.' } });
	}
};

export const DeleteTaskController = async (req, res) => {
	try {
		const taskId = await prismaClient.task.findUnique({
			where: { id: Number(req.params.id) },
		});

		if (!taskId) {
			return res.status(404).json({ error: { message: 'Not found!' } });
		}

		const deletedTask = await prismaClient.task.delete({
			where: { id: Number(req.params.id) },
		});

		res
			.status(200)
			.json({ message: 'Task deleted successfully.', task: deletedTask });
	} catch (err) {
		return res
			.status(500)
			.json({ error: { message: 'Internal server error.' } });
	}
};
