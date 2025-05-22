import express from 'express'
import { userSignup, userLogin, userLogout } from '../controllers/AuthController.js'

const router = express.Router()

router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/logout', userLogout)

export default router
