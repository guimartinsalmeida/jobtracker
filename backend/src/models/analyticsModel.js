import pool from '../config/db.js';

export const getAnalyticsByUserIdService = async (userId) => {
  // Total applications
  const totalAppsResult = await pool.query(
    'SELECT COUNT(*) FROM jobs WHERE user_id = $1',
    [userId]
  );  
  const totalApplications = parseInt(totalAppsResult.rows[0].count);

  // Status counts
  const statuses = ['interviewed', 'offer', 'rejected'];
  const statusCounts = {};
  for (const status of statuses) {
    const result = await pool.query(
      'SELECT COUNT(*) FROM jobs WHERE user_id = $1 AND status = $2',
      [userId, status]
    );
    statusCounts[status.toLowerCase()] = parseInt(result.rows[0].count);
  }

  // Applications by status
  const statusDistResult = await pool.query(
    `SELECT status, COUNT(*) as count 
     FROM jobs 
     WHERE user_id = $1 
     GROUP BY status`,
    [userId]
  );

  // Applications over last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const timeSeriesResult = await pool.query(
    `SELECT 
      DATE_TRUNC('month', created_at) as month,
      COUNT(*) as count
     FROM jobs 
     WHERE user_id = $1 
     AND created_at >= $2
     GROUP BY DATE_TRUNC('month', created_at)
     ORDER BY month ASC`,
    [userId, sixMonthsAgo]
  );

  // Recent applications
  const recentApplicationsResult = await pool.query(
    `SELECT 
      job_title as title,
      company_name as company,
      status,
      created_at
     FROM jobs 
     WHERE user_id = $1 
     ORDER BY created_at DESC 
     LIMIT 5`,
    [userId]
  );

  // Conversion rate by platform
  const conversionByPlatformResult = await pool.query(
    `SELECT platform, 
            COUNT(*) FILTER (WHERE status IN ('interviewed', 'offer'))::float / NULLIF(COUNT(*), 0) * 100 as conversion_rate
     FROM jobs
     WHERE user_id = $1
     GROUP BY platform`,
    [userId]
  );

  // Success rate by job title
  const successByJobTitleResult = await pool.query(
    `SELECT job_title, 
            COUNT(*) FILTER (WHERE status = 'offer')::float / NULLIF(COUNT(*), 0) * 100 as success_rate,
            COUNT(*) as total_applications
     FROM jobs
     WHERE user_id = $1 AND job_title IS NOT NULL AND job_title != ''
     GROUP BY job_title
     HAVING COUNT(*) > 0
     ORDER BY success_rate DESC`,
    [userId]
  );



  // Success rate by job type
  const successByJobTypeResult = await pool.query(
    `SELECT job_type, 
            COUNT(*) FILTER (WHERE status = 'offer')::float / NULLIF(COUNT(*), 0) * 100 as success_rate,
            COUNT(*) as total_applications
     FROM jobs
     WHERE user_id = $1 AND job_type IS NOT NULL AND job_type != ''
     GROUP BY job_type
     HAVING COUNT(*) > 0
     ORDER BY success_rate DESC`,
    [userId]
  );

  // Best performing CV
  const cvPerformanceResult = await pool.query(
    `SELECT cv_file_url, 
            COUNT(*) FILTER (WHERE status IN ('interviewed', 'offer')) as successful_apps,
            COUNT(*) as total_apps
     FROM jobs
     WHERE user_id = $1
     GROUP BY cv_file_url`,
    [userId]
  );

  return {
    summary: {
      totalApplications,
      interviewsScheduled: statusCounts.interviewed,
      offersReceived: statusCounts.offer,
      rejections: statusCounts.rejected
    },
    byStage: statusDistResult.rows,
    overTime: timeSeriesResult.rows,
    recentApplications: recentApplicationsResult.rows,
    insights: {
      conversionByPlatform: conversionByPlatformResult.rows,
      successByJobTitle: successByJobTitleResult.rows,
      successByJobType: successByJobTypeResult.rows,
      successByJobTitle: successByJobTitleResult.rows,
      bestPerformingCVs: cvPerformanceResult.rows
    }
  };
};
