import pool from '../config/db.js'

export const createJobTable = async () => {
  console.log('createJobTable() foi chamada')
  const query = `CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    job_title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    cv_file_url TEXT,
    platform TEXT,
    job_type TEXT,
    status TEXT DEFAULT 'applied',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )`

  try {
    await pool.query(query)
    console.log('Job table created successfully')
  } catch (error) {
    console.error('Error creating job table', error)
  }
}

export default createJobTable 