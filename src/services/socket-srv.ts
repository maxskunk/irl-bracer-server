import { ChatStorage } from "../chat-storage";
import { Msg } from "../models/msg.model";
import { Twitch } from "../twitch";
import { OBSService } from "./obs-serv";

const MSG_REQUEST: string = "msg_request";
const MSG_PAYLOAD: string = "msg_payload";
const IMG_PAYLOAD: string = "img_payload";
const IMG_REQUEST: string = "img_request";
const MSG_CLIENT_MSG: string = "msg_client_msg";


export class SocketServer {
    private _io: any;
    private _socket: any;
    private _chatStorage: ChatStorage;
    private _obsServ: OBSService;
    private _twitch: Twitch;

    constructor(storage: ChatStorage, twitch: Twitch, obsServ: OBSService) {

        this._obsServ = obsServ;
        this._chatStorage = storage;
        this._twitch = twitch;


    }

    public connectAuthenticatedSocket(socket: any) {
        // this._io = io;
        console.log("CONNECT AUTH");
        // io.on('connection', (socket) => {
        this._socket = socket;
        console.log('a user connected');
        socket.on(MSG_REQUEST, (data) => {
            console.log("CLIENT REQUESTING MESSAGES");
            this.sendMsgesToClient(this._chatStorage.getHistory());
        });

        socket.on(MSG_CLIENT_MSG, (data) => {
            console.log("CLIENT SENT MESSAGE: " + data);
            this._twitch.sendMessage(data);
        });

        socket.on(IMG_REQUEST, () => {
            this.handleImgRequest();
        });
    }

    public sendMsgesToClient(msgs: Msg[]) {
        console.log("SENDING MESSAGS TO CLIENT: " + Msg.length);
        this._socket.emit(MSG_PAYLOAD, msgs);

    }

    public sendPreviewToClient(img: Blob) {
        this._socket.emit(IMG_PAYLOAD, img);
    }

    public async handleImgRequest() {
        this._obsServ.getPreview();
    }


}