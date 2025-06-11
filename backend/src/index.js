import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import errorHandling from './middlewares/errorHandler.js'
import resumeAnalysisRoutes from './routes/resumeAnalysisRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'
import analyticsRoutes from './routes/analyticsRoutes.js'
import axios from 'axios'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const app = express()

const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:3000', 'https://jobtracker-production.up.railway.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

//routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/resume', resumeAnalysisRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use(errorHandling)
//testing pg connection
app.get('/', async(req, res) =>{
  const result = await pool.query("SELECT current_database()")
  res.send(`the db name is: ${result.rows[0].current_database}`)
})

//server running
app.listen(port, () =>{
   console.log(`Server is running on http://localhost:${port}`) 
})

axios.defaults.withCredentials = true;