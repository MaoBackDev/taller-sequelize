import express from 'express';
import userRouter from './routes/user.routes.js';
import skillRouter from './routes/skill.routes.js'

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/skills', skillRouter);


export default app;
