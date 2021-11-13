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
import { OBSService } from './services/obs-serv';
import { SocketServer } from './services/socket-srv';
import { Twitch } from './twitch';



//IO Constants
const MSG_REQUEST: string = "msg_request";

app.use(cors());
const OBSServ: OBSService = new OBSService();
//connect to twitch
const twitch: Twitch = new Twitch();
const storage: ChatStorage = new ChatStorage();
const sServer: SocketServer = new SocketServer(io, storage, twitch, OBSServ);



OBSServ.connect();

OBSServ.preivewImage.subscribe(res => {
    sServer.sendPreviewToClient(res);
});

twitch.connectToChannel("zokyamedia");

twitch.ChatMessage.subscribe(res => {
    console.log(res.userName + " says " + res.msg);
    //store message
    storage.addMsg(res);
    sServer.sendMsgesToClient(storage.getHistory());
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
