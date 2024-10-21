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
                    username:updatedRegister.username,
                    userId:updatedRegister.id
                },
                message:"User registered successfulyy",
                meta:null
            })
        }
        catch(err){
            console.log("Error",err)
        }
    }
     profilepic = async (req, res, next) => {
        console.log('Uploaded file:', req.file); // Check if this logs the file info
    
        try {
            const username = req.body.username;
            const payload = req.file.path;
    
            if (!req.file) {
                return res.status(400).json({
                    message: "No file uploaded",
                    meta: null,
                });
            }
    
            const user = await CasUsers.findOneAndUpdate({username:username}, { image: payload }, { new: true });
    
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                    meta: null,
                });
            }
    
            
    
            res.status(200).json({
                result: payload,
                message: "Profile pic saved",
                meta: null,
            });
        } catch (err) {
            console.log('Error', err);
            res.status(500).json({ message: "An error occurred", meta: null });
        }
    };
    
    login=async(req,res,next)=>{
        try{
            const {username,password}=req.body
            const userDetail=await CasUsers.findOne({username:username})
            if(!userDetail){
                return res.status(400).json({
                    result:"",
                    message:"Username not found",
                    meta:null
                })
            }
            if(!bcrypt.compareSync(password,userDetail.password)){
               return res.status(404).json({
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

           return res.json({
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
                    profilePicUrl:loggedinUser.image
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