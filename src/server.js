import express from 'express';
import { testConnection } from './config/db.js';
import userRouter from './routes/usersRoute.js';
import productRouter from './routes/productRoute.js';
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.use(userRouter);
app.use(productRouter)

app.listen(port, () => {
    console.log(`server lari http://localhost:${port}`);
    testConnection();
});
