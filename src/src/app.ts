const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
import { ChatStorage } from './chat-storage';
import { Twitch } from './twitch';

//connect to twitch
const twitch: Twitch = new Twitch();
const storage: ChatStorage = new ChatStorage();
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