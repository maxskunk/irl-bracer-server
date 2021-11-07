const express = require('express');
var cors = require('cors')
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
import { ChatStorage } from './chat-storage';
import { SocketServer } from './socket-srv';
import { Twitch } from './twitch';


//IO Constants
const MSG_REQUEST: string = "msg_request";


app.use(cors());

//connect to twitch
const twitch: Twitch = new Twitch();
const storage: ChatStorage = new ChatStorage();
const sServer: SocketServer = new SocketServer(io, storage, twitch);
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
