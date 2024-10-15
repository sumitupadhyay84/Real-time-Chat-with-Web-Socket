// this is the backend of chat app... DOCS :- socket.io
const http = require("http"); // it require to attached with socket.io(library of web socket which connect with http protocol)
const express = require("express");
const path = require("path");
const { Server } = require("socket.io"); //A server that integrates with (or mounts on) the Node.JS HTTP Server 

const app = express();
const server = http.createServer(app); // make server with httpprotocols + express; 
const io = new Server(server); // it handle the sockets..

//Sockets.io ....
io.on('connection', (socket) => {            // socket are users 
    socket.on("user-message",(message)=>{   // from the frontend (user send the message to the server so this event happening...)
        // console.log("A new user message",message); this give message in terminal which coming from user side.
        io.emit("message",message);        // then server send the message to all which send by the users
    });
});
  

app.use(express.static(path.resolve("./public"))); // To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

app.get("/",(req,res)=>{
    return res.sendFile("/public/index.html");
});

server.listen(9000,()=>console.log(`Server connected at port:9000`));

//Upgrade header can be used to upgrade an already established client/server connection 
//to a different protocol (over the same transport protocol). For example, it can be used by a client to upgrade a connection from HTTP 1.1 to HTTP 2.0, or an HTTP or HTTPS connection into a WebSocket.

//WebSocket API makes it possible to open a two-way interactive communication session between the user's browser and a server. 
//With this API, you can send messages to a server and receive responses without having to poll the server for a reply.