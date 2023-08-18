import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import skillRouter from './routes/skill.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/skills', skillRouter);
app.use('/api/auth', authRouter);


export default app;
