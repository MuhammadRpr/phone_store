import express from 'express';
import { testConnection } from './config/db.js';

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`server lari http://localhost:${port}`);
    testConnection();
});
