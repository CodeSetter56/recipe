import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_API)

app.listen(process.env.PORT,()=>{
    console.log(`server started at: ${process.env.PORT}`);
})