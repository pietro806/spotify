import mysql from 'mysql2/promise'

const conexao = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.PASSWORD
});

console.log('db on');
export default conexao;