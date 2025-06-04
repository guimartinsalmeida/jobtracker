import { getAnalyticsByUserIdService } from '../models/analyticsModel.js'

export const getAnalyticsByUserId = async (req, res) => {
  const { id } = req.params
  try {
    const analytics = await getAnalyticsByUserIdService(id)
    res.status(200).json(analytics)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 