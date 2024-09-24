import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserModel } from "../models/User_model.js"

const router = express.Router()

router.post("/register",async(req,res)=>{
    const {username,password} = req.body
    const user = await UserModel.findOne({username})
    const hidepassword = await bcrypt.hash(password,10)

    if(user)return res.json({message:"user exists"})
    else{
        const newUser = new UserModel({username,password: hidepassword})
        await newUser.save()
    }

    res.json({message: "user registered"})
})

router.post("/login")

export {router as UserRouter}