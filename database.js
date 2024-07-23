// const mysql = require('mysql');

import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise()

async function getExpenses() {
    const [rows] = await pool.query('SELECT * FROM expenses')
    return rows
}

async function addExpense(expense) {
    await pool.query('INSERT INTO expenses SET ?', expense)
}

const expenses = await getExpenses()
const newExpense = {  category: 'New Expense', amount: 100, date: '2024-07-24' }
await addExpense(newExpense)
console.log(expenses) // New Expense