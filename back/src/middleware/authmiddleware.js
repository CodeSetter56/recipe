import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err)=>{
            if(err) return res.sendStatus(403)
            next()
        })
    }else return res.sendStatus(401)
}