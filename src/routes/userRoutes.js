import express from 'express'
import { createUser, getAllUsers, getUsersById, updateUser, deleteUser } from '../controllers/userController.js'
const router = express.Router()

router.post('/user', createUser)
router.get('/user', getAllUsers)
router.get('/user/:id', getUsersById)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router