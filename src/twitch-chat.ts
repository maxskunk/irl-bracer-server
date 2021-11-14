import * as tmi from 'tmi.js';
import config from './twitch-config.json';

export class TwitchChat {
    private client = new tmi.Client({
        options: { debug: true },
        identity: {
            username: config.twitchUserName,
            password: config.twitchOauth
        },
        channels: ['zokymedia']
    });
    public connect() {
        this.client.connect();
        console.log("CONNECTING");
        this.client.on('message', (channel, tags, message, self) => {
            console.log("GOT TO THIS POINT")
            // Ignore echoed messages.
            if (self) return;

            if (message.toLowerCase() === '!hello') {
                console.log("GETTING HERE");
                // "@alca, heya!"
                this.client.say(channel, `@${tags.username}, heya!`);
            }
        });
    }
    public say(msg) {
        this.client.say(config.twitchChannel, msg);
    }
}