import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173']
    }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

//used to store online users 
const userSocketMap = {

};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id); 

    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id;
    }

    // io.emit sends the event to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Fixed event name

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);

        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Fixed event name
    });
});

export { io, app, server };