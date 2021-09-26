"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const chat_storage_1 = require("./chat-storage");
const twitch_1 = require("./twitch");
//connect to twitch
const twitch = new twitch_1.Twitch();
const storage = new chat_storage_1.ChatStorage();
twitch.connectToChannel("zokyamedia");
twitch.ChatMessage.subscribe(res => {
    console.log(res.userName + " says " + res.msg);
    //store message
    storage.addMsg(res);
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    console.log('a user connected');
});
server.listen(3000, () => {
    console.log('listening on *:3000');
});
//# sourceMappingURL=app.js.map