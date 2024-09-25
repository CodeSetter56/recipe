import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    saved:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user_recipes",
    }]
})

export const UserModel = mongoose.model("users",UserSchema)