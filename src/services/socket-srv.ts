import { ChatStorage } from "../src/chat-storage";
import { Msg } from "../src/models/msg.model";
import { Twitch } from "../src/twitch";

const MSG_REQUEST: string = "msg_request";
const MSG_PAYLOAD: string = "msg_payload";
const MSG_CLIENT_MSG: string = "msg_client_msg";

export class SocketServer {
    private _io: any;
    private _socket: any;
    private _chatStorage: ChatStorage;

    constructor(io: any, storage: ChatStorage, twitch: Twitch) {
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

    public sendMsgesToClient(msgs: Msg[]) {
        console.log("SENDING MESSAGS TO CLIENT: " + Msg.length);
        this._socket.emit(MSG_PAYLOAD, msgs);
    }
}