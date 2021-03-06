import * as ComfyJS from 'comfy.js';
import { Observable, Subscriber } from 'rxjs';
import { Msg } from './models/msg.model';
import { TwitchChat } from './twitch-chat';

const cjs = ComfyJS.default;
const tc: TwitchChat = new TwitchChat();

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
        cjs.onCommand = (user, cmd, message, flags, extra) => {
            this.onChatRecieved(user, "!" + cmd + " " + message, flags, extra);
        }

        this.ChatMessage = new Observable<Msg>((observer) => {
            this.subscriber = observer;
        });

        //connect to TMI
        tc.connect();
    }

    private onChatRecieved(displayName: string, msg: string, flags: ComfyJS.OnMessageFlags, extra: ComfyJS.OnMessageExtra) {
        const sendMsg = new Msg();
        sendMsg.userColor = extra.userColor;
        sendMsg.msg = msg;
        sendMsg.id = extra.id;
        sendMsg.userName = displayName;
        this.subscriber.next(sendMsg);
    }

    public sendMessage(msg: string) {
        tc.say(msg);
    }
}