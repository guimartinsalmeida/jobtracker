import express from 'express'
import { getUserCVs } from '../controllers/cvController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', authenticateToken, getUserCVs)

export default router 