import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './config/db.js'
import createUserTable from './data/createUserTable.js'
import userRoutes from './routes/userRoutes.js'
import errorHandling from './middlewares/errorHandler.js'
dotenv.config()

const app = express()

const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

//routes
app.use('/api', userRoutes)
//error handling
app.use(errorHandling)

// create table before running the server
createUserTable()

//testing pg connection

app.get('/', async(req, res) =>{
  const result = await pool.query("SELECT current_database()")
  res.send(`the db name is: ${result.rows[0].current_database}`)
})

//server running
app.listen(port, () =>{
   console.log(`Server is running on http://localhost:${port}`) 
})