import pool from '../config/db.js'

export const createCVTable = async () => {
  console.log('createCVTable() foi chamada')
  const query = `CREATE TABLE IF NOT EXISTS cvs (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    file_url TEXT NOT NULL,
    original_filename TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  )`

  try {
    await pool.query(query)
    console.log('CV table created successfully')
  } catch (error) {
    console.error('Error creating CV table', error)
  }
}

export default createCVTable 