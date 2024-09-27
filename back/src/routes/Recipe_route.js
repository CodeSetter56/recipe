import express from "express"
import mongoose from "mongoose"

import { RecipeModel } from "../models/Recipe_model.js"
import { UserModel } from "../models/User_model.js"

const router = express.Router()

router.get("/",async(req,res)=>{
    try {
        const response = await RecipeModel.find({})
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

router.post("/",async(req,res)=>{
    const recipe = new RecipeModel(req.body)
    try {
        const response = await recipe.save()
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

router.put("/",async(req,res)=>{
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID)
        user.saved.push(recipe)
        await user.save()
        res.json({saved:user.saved})
    } catch (error) {
        res.json(error)
    }
})

router.get("/saved/ids/:userID",async(req,res)=>{
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({saved:user?.saved})
    } catch (error) {
        res.json(error)
    }
})

router.get("/saved",async(req,res)=>{
    try {
        const user = await UserModel.findById(req.body.userID)
        const saved = await RecipeModel.find({_id:{$in:user.saved}})
        res.json({saved})
    } catch (error) {
        res.json(error)
    }
})

export {router as RecipeRouter}