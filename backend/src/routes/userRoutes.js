import express from 'express'
import {
  createUser,
  getAllUsers,
  getUsersById,
  updateUser,
  deleteUser
} from '../controllers/userController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', authenticateToken, createUser)
router.get('/', authenticateToken, getAllUsers)
router.get('/:id', authenticateToken, getUsersById)
router.put('/:id', authenticateToken, updateUser)
router.delete('/:id', authenticateToken, deleteUser)

export default router
