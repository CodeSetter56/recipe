import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from 'dotenv'

import { UserRouter } from "./routes/User_route.js"
import { RecipeRouter } from "./routes/Recipe_route.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send("server is running");
});

app.use("/auth", UserRouter)
app.use("/recipe", RecipeRouter)

mongoose.connect(process.env.MONGO_API)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server started at: ${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
