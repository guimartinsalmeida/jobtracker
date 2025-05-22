import pool from '../config/db.js'

export const createUserTable = async () => {
  console.log('createUserTable() foi chamada') // <--- aqui
  const query = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )`

  try {
    await pool.query(query)
    console.log('User table created successfully')
  } catch (error) {
    console.error('Error creating user table', error)
  }
}


export default createUserTable
