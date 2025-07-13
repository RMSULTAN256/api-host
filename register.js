import express from 'express';
import bcrypt from 'bcrypt';
import mysql from 'mysql';

const router = express.Router();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cust'
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.status(400).json({
        error: 'All fields are required.'
    });

    try {
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const hashed = await bcrypt.hash(password, 10);

        db.query(sql, [username, email, hashed], (err, result) => {
            if (err) return res.status(500).json({ message: 'Database Error', details: err});
            res.status(201).json({ message: 'Register Successfully.'});
            console.log(result.insertId);
        });

    } catch (err) {
        res.status(500).json({ error: 'Internal server error.'})
        console.error(err)
    }
});

export default router;