// // Install socket.io-client in your client project
// // npm install socket.io-client

// import { io } from "socket.io-client";

// // Connect to the backend Socket.IO server
// const socket = io("http://127.0.0.1:3030");

// // Log when connected
// socket.on("connect", () => {
//     console.log("Connected to the Socket.IO server");

//     // Send a message to the server
//     socket.emit("message", "Hello from Node.js client");
// });

// // Log when a message is received from the server
// socket.on("message", (data) => {
//     console.log("Message from server:", data);
// });

// // Handle disconnection
// socket.on("disconnect", () => {
//     console.log("Disconnected from the Socket.IO server");
// });
