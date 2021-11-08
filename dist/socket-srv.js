"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const MSG_REQUEST = "msg_request";
const MSG_PAYLOAD = "msg_payload";
const MSG_CLIENT_MSG = "msg_client_msg";
class SocketServer {
    constructor(io, storage, twitch) {
        this._io = io;
        this._chatStorage = storage;
        io.on('connection', (socket) => {
            this._socket = socket;
            console.log('a user connected');
            socket.on(MSG_REQUEST, (data) => {
                console.log("CLIENT REQUESTING MESSAGES");
                // this._socket.emit(MSG_PAYLOAD, "PAYLOAD")
                this.sendMsgesToClient(this._chatStorage.getHistory());
            });
            socket.on(MSG_CLIENT_MSG, (data) => {
                console.log("CLIENT SENT MESSAGE: " + data);
                // this._socket.emit(MSG_PAYLOAD, "PAYLOAD")
                //this.sendMsgesToClient(this._chatStorage.getHistory());
                twitch.sendMessage(data);
            });
        });
    }
    sendMsgesToClient(msgs) {
        console.log("SENDING MESSAGES: " + msgs);
        this._socket.emit(MSG_PAYLOAD, msgs);
    }
}
exports.SocketServer = SocketServer;
//# sourceMappingURL=socket-srv.js.map