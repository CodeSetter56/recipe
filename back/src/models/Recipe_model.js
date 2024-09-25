import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    ingredients:[{
        type:String,
        required:true,
    }],
    instructions:{
        type:String,
        required:true,
    },
    imgURL:{
        type:String,
        required:true,
    },
    cookingtime:{
        type:Number,
        required:true,
    },
    chef:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

export const RecipeModel = mongoose.model("user_recipes",RecipeSchema)