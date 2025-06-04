import express from 'express'
import { getAnalyticsByUserId } from '../controllers/analyticsController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/user/:id', authenticateToken, getAnalyticsByUserId)

export default router 