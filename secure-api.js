import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database create')
})
