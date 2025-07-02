import pool from '../config/db.js'

export const createCVInDB = async ({
  user_id,
  cv_name,
  cv_file_url,
  original_filename
}) => {
  const result = await pool.query(
    `INSERT INTO user_cvs (
      user_id, cv_name, cv_file_url, original_filename
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [user_id, cv_name, cv_file_url, original_filename]
  )

  return result.rows[0]
}

export const getUserCVsService = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM user_cvs 
     WHERE user_id = $1 AND is_active = true 
     ORDER BY created_at DESC`,
    [user_id]
  )

  return result.rows
}

export const getCVByIdService = async (cv_id, user_id) => {
  const result = await pool.query(
    `SELECT * FROM user_cvs 
     WHERE id = $1 AND user_id = $2 AND is_active = true`,
    [cv_id, user_id]
  )

  return result.rows[0]
}

export const updateCVService = async (cv_id, user_id, updateData) => {
  const { cv_name } = updateData
  
  const result = await pool.query(
    `UPDATE user_cvs 
     SET cv_name = $1, updated_at = NOW()
     WHERE id = $2 AND user_id = $3 AND is_active = true
     RETURNING *`,
    [cv_name, cv_id, user_id]
  )

  return result.rows[0]
}

export const deleteCVService = async (cv_id, user_id) => {
  const result = await pool.query(
    `UPDATE user_cvs 
     SET is_active = false, updated_at = NOW()
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [cv_id, user_id]
  )

  return result.rows[0]
}

// New functions for the simplified CV table
export const saveCVToDB = async ({ user_id, file_url, original_filename }) => {
  const result = await pool.query(
    `INSERT INTO cvs (user_id, file_url, original_filename)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [user_id, file_url, original_filename]
  )

  return result.rows[0]
}

export const getCVsByUserId = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM cvs 
     WHERE user_id = $1 
     ORDER BY created_at DESC`,
    [user_id]
  )

  return result.rows
} 