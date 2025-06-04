import pool from '../config/db.js'

export const getAnalyticsByUserIdService = async (userId) => {
  // Get total applications
  const totalAppsResult = await pool.query(
    'SELECT COUNT(*) FROM jobs WHERE user_id = $1',
    [userId]
  )
  const totalApplications = parseInt(totalAppsResult.rows[0].count)

  // Get interviews scheduled (phase = 'Interview')
  const interviewsResult = await pool.query(
    'SELECT COUNT(*) FROM jobs WHERE user_id = $1 AND phase = $2',
    [userId, 'Interview']
  )
  const interviewsScheduled = parseInt(interviewsResult.rows[0].count)

  // Get offers received (phase = 'Offer')
  const offersResult = await pool.query(
    'SELECT COUNT(*) FROM jobs WHERE user_id = $1 AND phase = $2',
    [userId, 'Offer']
  )
  const offersReceived = parseInt(offersResult.rows[0].count)

  // Get rejections (phase = 'Rejected')
  const rejectionsResult = await pool.query(
    'SELECT COUNT(*) FROM jobs WHERE user_id = $1 AND phase = $2',
    [userId, 'Rejected']
  )
  const rejections = parseInt(rejectionsResult.rows[0].count)

  // Get applications by stage
  const stagesResult = await pool.query(
    `SELECT phase, COUNT(*) as count 
     FROM jobs 
     WHERE user_id = $1 
     GROUP BY phase`,
    [userId]
  )

  // Get applications over time (last 6 months)
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  
  const timeSeriesResult = await pool.query(
    `SELECT 
      DATE_TRUNC('month', application_date) as month,
      COUNT(*) as count
     FROM jobs 
     WHERE user_id = $1 
     AND application_date >= $2
     GROUP BY DATE_TRUNC('month', application_date)
     ORDER BY month ASC`,
    [userId, sixMonthsAgo]
  )

  // Get recent applications (last 5)
  const recentApplicationsResult = await pool.query(
    `SELECT 
      job_title as title,
      company_name as company,
      phase as stage,
      application_date,
      created_at
     FROM jobs 
     WHERE user_id = $1 
     ORDER BY created_at DESC 
     LIMIT 5`,
    [userId]
  )

  return {
    summary: {
      totalApplications,
      interviewsScheduled,
      offersReceived,
      rejections
    },
    byStage: stagesResult.rows,
    overTime: timeSeriesResult.rows,
    recentApplications: recentApplicationsResult.rows
  }
} 