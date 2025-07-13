import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import mysql from 'mysql';
import loginRoutes from './login.js';
import regisRoutes from './register.js';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

const database = 'CREATE DATABASE IF NOT EXISTS ??';
const namedata = 'customer';
try {
    db.query(database, [namedata], (err) => {
    if (err) throw err;
    console.log('Database Created');
    });
} catch (err) {
    if (err) throw err;
    console.log('Not work');
};


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/login', loginRoutes);
app.use('/api/register', regisRoutes);

app.listen(5000, () => console.log('Server online'));