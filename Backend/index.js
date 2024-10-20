import http from "http"
import express from "express"
import router from "./src/routing.js"
import multer from "multer"
import path from "path"
import { dirname } from "path"
import { fileURLToPath } from 'url';
import "./db.config.js"
import {Server} from "socket.io"
import "./socket.io.connection.js"

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {cors: {
    // origin: "https://example.com",
    methods: ["GET", "POST"]
  }}
);
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // Use dirname to get the directory name

const upload=multer({dest:'uploads/'})

app.use(express.static(path.join(__dirname,"../frontend")))//messages comes from frontend servre

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,"../../frontend/index.html")) //path to frontend folder
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', router)



io.on("connection",(socket)=>{
    console.log("connected to frontend")
    socket.on("user-message",(message)=>{//user-message is coming msg that comes from the client
        console.log("server-sidemessage",message)
        io.emit('message',message)//io.emit will show the message to everyone
    })

})

httpServer.listen(3030, '127.0.0.1', (err) => {
    if (!err) {
        console.log("Server successfully started")
    }
    else {
        console.log(err)
    }
})