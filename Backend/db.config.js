import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
mongoose.connect(process.env.MONGODB_URL,{
    dbName:process.env.MONGODB_DB_NAME,
    autoCreate:true,
    autoIndex:true
}).then((res)=>{
    console.log("db is connceted")
})
    .catch((err)=>{
       console.log(err)
       throw err 
    })