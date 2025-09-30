import express from 'express';
import { testConnection } from './config/db.js';
import userRouter from './routes/usersRoute.js';

const app = express();

app.use(express.json());

const port = 3000;

app.use(userRouter);

app.listen(port, () => {
    console.log(`server lari http://localhost:${port}`);
    testConnection();
});
