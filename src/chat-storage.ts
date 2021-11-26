import { Msg } from "./models/msg.model";

const LINES_TO_KEEP: number = 1000;

export class ChatStorage {

    private _msgs: Msg[] = [];
    private _curMsgId = 0;

    public addMsg(newMsg: Msg) {

        this._msgs.push(newMsg);
        if (this._msgs.length > LINES_TO_KEEP) {
            this._msgs.splice(0, 1);
        }
    }

    public getHistory(): Msg[] {
        return this._msgs;
    }
}