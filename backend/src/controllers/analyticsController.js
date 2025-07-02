import { getAnalyticsByUserIdService } from '../models/analyticsModel.js'

export const getAnalyticsByUserId = async (req, res) => {
  const { id } = req.params
  const authenticatedUserId = req.userId
  
  // Ensure the authenticated user can only access their own analytics
  if (authenticatedUserId !== id) {
    return res.status(403).json({ message: 'Access denied. You can only access your own analytics.' })
  }
  
  try {
    const analytics = await getAnalyticsByUserIdService(id)
    res.status(200).json(analytics)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 