import express from "express"
import mongoose from "mongoose"

import { RecipeModel } from "../models/Recipe_model.js"
import { UserModel } from "../models/User_model.js"
import {verifyToken} from "../middleware/authmiddleware.js"

const router = express.Router()

router.get("/", async(req,res)=>{
    try {
        const response = await RecipeModel.find({})
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

router.post("/",verifyToken,async(req,res)=>{
    const recipe = new RecipeModel(req.body)
    try {
        const response = await recipe.save()
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

//saving 
router.put("/",verifyToken,async(req,res)=>{
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

router.delete("/:recipeID",verifyToken,async(req,res)=>{
    try {
        const recipe = await RecipeModel.findById(req.params.recipeID)
        const user = await UserModel.findById(req.body.userID)
        user.saved.pull(recipe)
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

router.get("/saved/:userID",async(req,res)=>{
    try {
        const user = await UserModel.findById(req.params.userID)
        const saved = await RecipeModel.find({_id:{$in:user.saved}})
        res.json({saved})
    } catch (error) {
        res.json(error)
    }
})

//editing
router.put("/:recipeID", verifyToken, async (req, res) => {
    try {
      const updatedRecipe = await RecipeModel.findByIdAndUpdate(req.params.recipeID, req.body, { new: true });
      res.json(updatedRecipe);
    } catch (error) {
      res.json(error);
    }
});

router.get("/:recipeID", async (req, res) => {
    try {
      const recipe = await RecipeModel.findById(req.params.recipeID);
      if (!recipe) return res.status(404).send("Recipe not found");
      res.json(recipe);
    } catch (error) {
      res.status(500).json(error);
    }
  });

export {router as RecipeRouter}