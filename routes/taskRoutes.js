import express from 'express';
import { CreateTaskController } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const taskRouter = express.Router();

taskRouter.post('/create', authMiddleware, CreateTaskController);

// taskRouter.put('/update', );

// taskRouter.delete('/delete',);

// taskRouter.get('/fetch-all',);

export default taskRouter;