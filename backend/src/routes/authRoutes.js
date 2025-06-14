import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'

const router = express.Router()

// Função de registro de usuário
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    )

    const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(201).json({ message: 'User created successfully', user: newUser.rows[0], token })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})

// Função de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    console.log('Attempting login for email:', email)
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined')
    }

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({ message: 'Login successful', user: user.rows[0], token })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})

// Função de logout
router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logout successful' })
})

export default router
