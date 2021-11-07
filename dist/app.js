"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
var cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
const chat_storage_1 = require("./chat-storage");
const socket_srv_1 = require("./socket-srv");
const twitch_1 = require("./twitch");
//IO Constants
const MSG_REQUEST = "msg_request";
app.use(cors());
//connect to twitch
const twitch = new twitch_1.Twitch();
const storage = new chat_storage_1.ChatStorage();
const sServer = new socket_srv_1.SocketServer(io, storage, twitch);
twitch.connectToChannel("zokyamedia");
twitch.ChatMessage.subscribe(res => {
    console.log(res.userName + " says " + res.msg);
    //store message
    storage.addMsg(res);
    sServer.sendMsgesToClient(storage.getHistory());
});
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });
// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on(MSG_REQUEST, function (data) {
//         console.log("CLIENT REQUESTING MESSAGES");
//     });
// });
server.listen(3000, () => {
    console.log('listening on *:3000');
});
//# sourceMappingURL=app.js.map