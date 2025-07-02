import { getCVsByUserId } from '../models/cvModel.js'

// Get all CVs for the authenticated user
export const getUserCVs = async (req, res) => {
  try {
    const user_id = req.userId
    const cvs = await getCVsByUserId(user_id)
    
    res.status(200).json(cvs)
  } catch (error) {
    console.error('Error fetching user CVs:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 