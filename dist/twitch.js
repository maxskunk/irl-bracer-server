"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Twitch = void 0;
const ComfyJS = __importStar(require("comfy.js"));
const rxjs_1 = require("rxjs");
const msg_model_1 = require("./models/msg.model");
const cjs = ComfyJS.default;
class Twitch {
    constructor() {
        this.subscriber = new rxjs_1.Subscriber();
        this.ChatMessage = new rxjs_1.Observable();
    }
    connectToChannel(channel) {
        cjs.Init(channel);
        cjs.onChat = (user, message, flags, self, extra) => {
            console.log("CHAT RECIEVED:" + JSON.stringify(extra));
            this.onChatRecieved(user, message);
        };
        this.ChatMessage = new rxjs_1.Observable((observer) => {
            this.subscriber = observer;
        });
    }
    onChatRecieved(displayName, msg) {
        const sendMsg = new msg_model_1.Msg();
        sendMsg.msg = msg;
        sendMsg.userName = displayName;
        this.subscriber.next(sendMsg);
    }
}
exports.Twitch = Twitch;
//# sourceMappingURL=twitch.js.map