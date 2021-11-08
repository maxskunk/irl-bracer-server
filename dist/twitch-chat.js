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
exports.TwitchChat = void 0;
const tmi = __importStar(require("tmi.js"));
class TwitchChat {
    constructor() {
        this.client = new tmi.Client({
            options: { debug: true },
            identity: {
                username: 'zokyamedia',
                password: 'oauth:'
            },
            channels: ['zokyamedia']
        });
    }
    connect() {
        this.client.connect();
        console.log("CONNECTING");
        this.client.on('message', (channel, tags, message, self) => {
            console.log("GOT TO THIS POINT");
            // Ignore echoed messages.
            if (self)
                return;
            if (message.toLowerCase() === '!hello') {
                console.log("GETTING HERE");
                // "@alca, heya!"
                this.client.say(channel, `@${tags.username}, heya!`);
            }
        });
    }
    say(msg) {
        this.client.say('zokyamedia', msg);
    }
}
exports.TwitchChat = TwitchChat;
//# sourceMappingURL=twitch-chat.js.map