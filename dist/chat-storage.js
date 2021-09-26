"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatStorage = void 0;
const LINES_TO_KEEP = 5;
class ChatStorage {
    constructor() {
        this._msgs = [];
    }
    addMsg(newMsg) {
        this._msgs.push(newMsg);
        if (this._msgs.length > LINES_TO_KEEP) {
            this._msgs.splice(LINES_TO_KEEP - 1, 1);
        }
    }
    getHistory() {
        return this._msgs;
    }
}
exports.ChatStorage = ChatStorage;
//# sourceMappingURL=chat-storage.js.map