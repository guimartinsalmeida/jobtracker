import pool from '../config/db.js'

export const removeExtraFields = async () => {
  console.log('removeExtraFields() foi chamada')
  
  try {
    // Remover campos que foram adicionados sem autorização
    const dropQueries = [
      "ALTER TABLE jobs DROP COLUMN IF EXISTS phase",
      "ALTER TABLE jobs DROP COLUMN IF EXISTS application_date",
      "ALTER TABLE jobs DROP COLUMN IF EXISTS location",
      "ALTER TABLE jobs DROP COLUMN IF EXISTS feedback",
      "ALTER TABLE jobs DROP COLUMN IF EXISTS notes",
      "ALTER TABLE jobs DROP COLUMN IF EXISTS cover_letter_url",
      "ALTER TABLE jobs DROP COLUMN IF EXISTS job_description",
      "ALTER TABLE jobs DROP COLUMN IF EXISTS first_response_days"
    ]

    for (const query of dropQueries) {
      try {
        await pool.query(query)
        console.log(`Executed: ${query}`)
      } catch (error) {
        console.log(`Field might not exist: ${error.message}`)
      }
    }

    console.log('Extra fields removed successfully')
  } catch (error) {
    console.error('Error removing extra fields', error)
  }
}

export default removeExtraFields 