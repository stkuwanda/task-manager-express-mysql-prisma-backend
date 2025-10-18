import express from 'express';
import dotenv from 'dotenv';
import rootRouter from './routes/index.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', rootRouter);

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
