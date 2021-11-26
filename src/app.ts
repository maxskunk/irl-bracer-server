const express = require('express');
var cors = require('cors')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketIoAuth = require("socketio-auth")
const io = new Server(server, {
    //MAY WANT TO MAKE THIS MORE RESTRICTIVE IN PRODUCTION
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
import { ChatStorage } from './chat-storage';
import { OBSService } from './services/obs-serv';
import { SocketServer } from './services/socket-srv';
import { Twitch } from './twitch';
import config from './twitch-config.json';



//IO Constants
const MSG_REQUEST: string = "msg_request";

app.use(cors());
const OBSServ: OBSService = new OBSService();
//connect to twitch
const twitch: Twitch = new Twitch();
const storage: ChatStorage = new ChatStorage();
const sServer: SocketServer = new SocketServer(storage, twitch, OBSServ);

//AUTH SETTINGS
function authenticate(socket, data, callback) {
    console.log("GOT HERE: " + data.password);
    var username = data.username;
    var password = data.password;

    return callback(null, true);
    // db.findUser('User', {username:username}, function(err, user) {
    //   if (err || !user) return callback(new Error("User not found"));
    //   return callback(null, true;
    // });
}

function disconnect(socket) {
    console.log(socket.id + ' disconnected');
}
const postAuthenticate = client => {

    sServer.connectAuthenticatedSocket(client);
};
socketIoAuth(io, {
    authenticate: authenticate,
    postAuthenticate: postAuthenticate,
    disconnect: disconnect,
    timeout: 1000
});




OBSServ.connect();

OBSServ.preivewImage.subscribe(res => {
    sServer.sendPreviewToClient(res);
});

twitch.connectToChannel(config.twitchChannel);

twitch.ChatMessage.subscribe(res => {
    console.log(res.userName + " says " + res.msg);
    //store message
    storage.addMsg(res);
    sServer.sendMsgesToClient(storage.getHistory());
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
