import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from 'dotenv'

import { UserModel } from "../models/User_model.js"

dotenv.config()
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

router.post("/login",async(req,res)=>{
    const {username,password} = req.body
    
    const user = await UserModel.findOne({username})
    if(!user)return res.json({message:"user dosen't exists"})
    
    const isValidpassword = await bcrypt.compare(password,user.password)
    if(!isValidpassword)return res.json({message:"wrong password"})

    const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
    res.json({token, UserId: user._id})
})

export {router as UserRouter}
