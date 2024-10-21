import express from "express"
import AuthCtrl from "./Auth/auth.ctrl.js"
import multer from "multer"
import {LoginSchema, RegisterSchema} from "./Auth/auth.validator.js"
import { validateRequest } from "./middlewares/joi.middlewares.js"
import { loginCheck } from "./middlewares/loginCheck.middleware.js"
import  uploader  from "./middlewares/multer.middleware.js"

const router=express.Router()




router.post('/register',uploader.none(),validateRequest(RegisterSchema),AuthCtrl.register)
router.post('/profilepic',uploader.single('image'),AuthCtrl.profilepic)
router.post('/login',uploader.none(),validateRequest(LoginSchema),AuthCtrl.login)
router.get('/getUser',uploader.none(),loginCheck,AuthCtrl.getUser)

router.use((req,res,next)=>{
    res.status(404).json({
        result:"",
        message:"Not found error",
        meta:null
    })
})


export default router