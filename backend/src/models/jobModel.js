import pool from '../config/db.js'

export const createJobInDB = async ({
  user_id,
  job_title,
  company_name,
  cv_file_url,
  cover_letter_url,
  job_description,
  phase,
  application_date,
  platform,
  first_response_days,
  feedback,
  location,
  job_type,
  notes,
}) => {
  const result = await pool.query(
    `INSERT INTO jobs (
      user_id, job_title, company_name, cv_file_url, cover_letter_url,
      job_description, phase, application_date, platform,
      first_response_days, feedback, location, job_type, notes
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
    RETURNING *`,
    [
      user_id,
      job_title,
      company_name,
      cv_file_url,
      cover_letter_url,
      job_description,
      phase,
      application_date,
      platform,
      first_response_days,
      feedback,
      location,
      job_type,
      notes,
    ]
  )

  return result.rows[0]
}

export const getAllJobsService = async () => {
  const result = await pool.query('SELECT * FROM jobs')
  return result.rows
}

export const getJobByIdService = async (id) => {
  const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id])
  return result.rows[0]
}

export const getJobsByUserIdService = async (userId) => {
  const result = await pool.query('SELECT * FROM jobs WHERE user_id = $1', [userId])
  return result.rows
}

export const updateJobService = async (id, jobData) => {
  const fields = Object.keys(jobData)
  const values = Object.values(jobData)

  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(', ')

  const result = await pool.query(
    `UPDATE jobs SET ${setClause}, updated_at = now() WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, id]
  )

  return result.rows[0]
}

export const deleteJobService = async (id) => {
  const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id])
  return result.rows[0]
}
  
