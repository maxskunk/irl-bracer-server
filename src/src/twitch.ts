import * as ComfyJS from 'comfy.js';
import { Observable, Subscriber } from 'rxjs';
import { Msg } from './models/msg.model';

const cjs = ComfyJS.default;

export class Twitch {
    private subscriber: Subscriber<Msg> = new Subscriber<Msg>();
    public ChatMessage: Observable<Msg> = new Observable<Msg>();

    private _channel: string;

    public connectToChannel(channel: string) {
        this._channel = channel;
        cjs.Init(channel);
        cjs.onChat = (user, message, flags, self, extra) => {
            this.onChatRecieved(user, message, flags, extra);
        }
        this.ChatMessage = new Observable<Msg>((observer) => {
            this.subscriber = observer;
        });
    }
    private onChatRecieved(displayName: string, msg: string, flags: ComfyJS.OnMessageFlags, extra: ComfyJS.OnMessageExtra) {

        const sendMsg = new Msg();
        sendMsg.userColor = extra.userColor;
        sendMsg.msg = msg;
        sendMsg.userName = displayName;
        this.subscriber.next(sendMsg);
    }

    public sendMessage(msg: string) {
        cjs.Say(msg, this._channel);
    }
}