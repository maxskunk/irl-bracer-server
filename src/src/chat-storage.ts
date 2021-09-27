import { Msg } from "./models/msg.model";

const LINES_TO_KEEP: number = 5;

export class ChatStorage {

    private _msgs: Msg[] = [];

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