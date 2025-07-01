import pool from '../config/db.js'

export const addStatusColumn = async () => {
  console.log('addStatusColumn() foi chamada')
  
  try {
    // Adicionar coluna status se ela não existir
    const query = `
      ALTER TABLE jobs 
      ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'applied'
    `

    await pool.query(query)
    console.log('Status column added successfully')
  } catch (error) {
    console.error('Error adding status column', error)
  }
}

export default addStatusColumn 