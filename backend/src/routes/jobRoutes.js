import express from 'express'
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByUserId
} from '../controllers/jobController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', authenticateToken, createJob)
router.get('/', authenticateToken, getAllJobs)
router.get('/user/:id', authenticateToken, getJobsByUserId)
router.get('/:id', getJobById)
router.put('/:id', updateJob)
router.delete('/:id', deleteJob)

export default router
