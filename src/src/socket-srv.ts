import { ChatStorage } from "./chat-storage";
import { Msg } from "./models/msg.model";

const MSG_REQUEST: string = "msg_request";
const MSG_PAYLOAD: string = "msg_payload";

export class SocketServer {
    private _io: any;
    private _socket: any;
    private _chatStorage: ChatStorage;

    constructor(io: any, storage: ChatStorage) {
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

    public sendMsgesToClient(msgs: Msg[]) {
        console.log("SENDING MESSAGES: " + msgs);
        this._socket.emit(MSG_PAYLOAD, msgs);
    }
}