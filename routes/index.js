import express from 'express';
import authRouter from './authRoutes.js';
import taskRouter from './taskRoutes.js';


const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);

rootRouter.use('/task', taskRouter);

export default rootRouter;
