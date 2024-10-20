import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"
import { CasUsers } from "../db.connection.js"

export const loginCheck=async(req,res,next)=>{
    try{
        let token=req.headers['authorization'] || null
        if(!token){
            res.status(400).json({message:"Please login first",meta:null})
        }
        token=token.split(" ").pop()
        console.log(token)
        if(!token){
            res.status(401).json({message:"No token available",meta:null})
        }

        const data=jwt.verify(token,process.env.JWT_SECRET)
        if(data.hasOwnProperty('type')&&data.type==="refresh"){
            res.status(400).json({message:"Use Access Token",meta:null})
        }
        const userDetail=await CasUsers.findOne({
            token:token
        })
        if(userDetail){
            const userinfo=await CasUsers.findOne({_id:userDetail.id})
        
        if(!userDetail){
            res.status(401).json({message:"Use doesn't exists anymore",meta:null})
        }
        else{
            req.authUser=userinfo
            next()
        }
    }
    else{
        res.status(401).json({message:"User already logged out",meta:null})
    }
        
    }
    catch(exception){
        console.log("exception",exception)
        res.status(400).json({
            message:"Please login first",
            meta:null
        })
    }
}