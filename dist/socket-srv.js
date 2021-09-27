"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const MSG_REQUEST = "msg_request";
const MSG_PAYLOAD = "msg_payload";
class SocketServer {
    constructor(io, storage) {
        this._io = io;
        this._chatStorage = storage;
        io.on('connection', (socket) => {
            this._socket = socket;
            console.log('a user connected FROM 2!!');
            socket.on(MSG_REQUEST, (data) => {
                console.log("CLIENT REQUESTING MESSAGES");
                // this._socket.emit(MSG_PAYLOAD, "PAYLOAD")
                this.sendMsgesToClient(this._chatStorage.getHistory());
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