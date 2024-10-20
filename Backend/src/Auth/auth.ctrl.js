import bcrypt from 'bcrypt'
import { AuthSvc } from './auth.service.js'
import { CasUsers } from '../db.connection.js'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

class AuthController{
    register=async(req,res,next)=>{
        try{
            let payload=req.body
            const hash=bcrypt.hashSync(payload.password,10)
            const updatedRegister={
                username:payload.username,
                password:hash,
            }
            await AuthSvc.registerSave(updatedRegister)
            // const savedUser=new CasUsers(updatedRegister)
            // return await savedUser.save()
            res.json({
                result:{
                    username:updatedRegister.username
                },
                message:"User registered successfulyy",
                meta:null
            })
        }
        catch(err){
            console.log("Error",err)
        }
    }
    profilepic=async(req,res,next)=>{
        try{
            const userId=req.params.id
            const payload=req.file.path
            const user=await CasUsers.findByIdAndUpdate(userId,{
                image:payload
            },{new:true})
            
            if(!user){
                return res.status(400).json({
                    message:"User not found",
                    meta:null
                })
            }
           
            const accessToken=jwt.sign({
                id:userDetail._id,
            },process.env.JWT_SECRET,{
                expiresIn:"4h"
            })

            res.json({
                result:payload.fieldname,
                message:"Profile pic saved",
                meta:null
            })
        }
        catch(err){
            console.log('Error',err)
            res.status(500).json({ message: "An error occurred", meta: null });
        }
    }
    login=async(req,res,next)=>{
        try{
            const {username,password}=req.body
            const userDetail=await CasUsers.findOne({username:username})
            if(!userDetail){
                res.status(400).json({
                    result:"",
                    message:"Username not found",
                    meta:null
                })
            }
            if(!bcrypt.compareSync(password,userDetail.password)){
                res.status(400).json({
                    result:"",
                    message:"Password doesn't match",
                    meta:null
                })
            }

            const accessToken=jwt.sign({
                id: userDetail._id,
            },process.env.JWT_SECRET,{
                expiresIn:"4h"
            })
            const refreshToken=jwt.sign({
                id: userDetail._id,
                type:"refresh"
            },process.env.JWT_SECRET,{
                expiresIn:"1d"
            })

            await CasUsers.findByIdAndUpdate(userDetail._id,{
                token:accessToken,
                refreshToken:refreshToken
            })

            res.status(200).json({
                result:{
                    username:userDetail.username,
                    accessToken:accessToken,
                    refreshToken:refreshToken
                },
                message:"Successfully logged in",
                meta:null
            })

        }
        catch(err){
            console.log('Error',err)
            res.json(400).json({message:"Coundn't login",meta:null})
        }
    }
    getUser=async(req,res,next)=>{
        try{
            const loggedinUser=req.authUser
            res.json({
                result:{
                    _id:loggedinUser._id,
                    username:loggedinUser.username,
                },
                message:"Your profile",
                meta:null
            })
        }   
        catch(err){
            console.log('Error',err)
        }
    }
}

const AuthCtrl=new AuthController()
export default AuthCtrl