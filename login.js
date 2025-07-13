import { body, validationResult } from 'express-validator';
import express from 'express';
import bcrypt from 'bcrypt';
import mysql from 'mysql';
import jwt from 'jsonwebtoken';

const router = express.Router();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cust'

});

db.connect(err => {
    if (err) throw err;
    console.log('Connected!. Continue')
});

router.post('/', [ 
    body('username').trim().not().isEmpty().withMessage('Username is required'),
    body('password').trim().not().isEmpty().withMessage('Password is required')
],(req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)
        const sql = 'SELECT * FROM users WHERE username = ?';

        db.query(sql, [username], async (err, result) => {
        if (err) throw err;

        const user = result[0];
        if (result.length === 0) {
            res.status(401).json({ message: 'User not Registered'});
            console.log('Username not found.');
            return;
        };
        
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(401).json({ message: 'Login Failed. Invalid username or password'})
            return;
        };
        const secret = "niggahitam256";

        const users = { username: user.username };
        const token = jwt.sign(users, secret, { expiresIn: '1h'});
        res.status(200).json({ success: true, token});
        
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.'})
    };
});

export default router;