import express from 'express'
import { createUser, getAllUsers, getUsersById, updateUser, deleteUser } from '../controllers/userController.js'
import { userSignup, userLogin, userLogout } from '../controllers/AuthController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'
const router = express.Router()

//auth routes
router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/logout', userLogout)

//user routes (protected)
router.post('/user', authenticateToken, createUser)
router.get('/user', authenticateToken, getAllUsers)
router.get('/user/:id', authenticateToken, getUsersById)
router.put('/user/:id', authenticateToken, updateUser)
router.delete('/user/:id', authenticateToken, deleteUser)

export default router