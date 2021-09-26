import * as ComfyJS from 'comfy.js';
import { Observable, Subscriber } from 'rxjs';
import { Msg } from './models/msg.model';

const cjs = ComfyJS.default;

export class Twitch {
    private subscriber: Subscriber<Msg> = new Subscriber<Msg>();
    public ChatMessage: Observable<Msg> = new Observable<Msg>();

    public connectToChannel(channel: string) {
        cjs.Init(channel);
        cjs.onChat = (user, message, flags, self, extra) => {
            this.onChatRecieved(user, message);
        }
        this.ChatMessage = new Observable<Msg>((observer) => {
            this.subscriber = observer;
        });
    }
    private onChatRecieved(displayName: string, msg: string) {

        const sendMsg = new Msg();
        sendMsg.msg = msg;
        sendMsg.userName = displayName;
        this.subscriber.next(sendMsg);
    } s
}