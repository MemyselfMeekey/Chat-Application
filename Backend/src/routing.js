import express from "express"
import AuthCtrl from "./Auth/auth.ctrl.js"
import multer from "multer"
import {LoginSchema, RegisterSchema} from "./Auth/auth.validator.js"
import { validateRequest } from "./middlewares/joi.middlewares.js"
import { loginCheck } from "./middlewares/loginCheck.middleware.js"

const router=express.Router()
const upload=multer({dest:'uploads/'})



router.post('/register',upload.none(),validateRequest(RegisterSchema),AuthCtrl.register)
router.post('/profilepic/:id',upload.single('image'),AuthCtrl.profilepic)
router.post('/login',upload.none(),validateRequest(LoginSchema),AuthCtrl.login)
router.get('/getUser',loginCheck,AuthCtrl.getUser)

router.use((req,res,next)=>{
    res.status(404).json({
        result:"",
        message:"Not found error",
        meta:null
    })
})


export default router