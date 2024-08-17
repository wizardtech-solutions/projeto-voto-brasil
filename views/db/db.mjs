import mysql from 'mysql'

const pool = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    connectionLimit: 10,

});

export default pool