import 'dotenv/config' // we will get all the environment variable in the backend process 
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'

//App Config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

//Initialize Middlewares
app.use(express.json())
app.use(cors()) // we can connect our client that is runnig on the different port to the backened server

//API routes
app.get('/', (req,res)=>res.send("API Working"))

app.listen(PORT, ()=> console.log("Server Running on Port "+PORT))
