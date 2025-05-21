import pkg from 'pg'
import dotenv from 'dotenv'
const {Pool} = pkg
 
dotenv.config()

console.log(process.env.DB_PASSWORD)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

pool.on("connect", () => {
  console.log("Connection pool establised with Database")
  
})

export default pool