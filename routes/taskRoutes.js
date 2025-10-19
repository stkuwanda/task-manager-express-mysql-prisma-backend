import express from 'express';
import { CreateTaskController, DeleteTaskController, FetchTasksController, UpdateTaskController } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const taskRouter = express.Router();

taskRouter.post('/create', authMiddleware, CreateTaskController);

taskRouter.put('/update/:id', authMiddleware, UpdateTaskController);

taskRouter.delete('/delete/:id', authMiddleware, DeleteTaskController);

taskRouter.get('/fetch', authMiddleware, FetchTasksController);

export default taskRouter;