import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import loginRoutes from './login.js';
import regisRoutes from './register.js';

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/login', loginRoutes);
app.use('/api/register', regisRoutes);

app.listen(5000, () => console.log('Server online'));