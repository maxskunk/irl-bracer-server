import * as tmi from 'tmi.js';

export class TwitchChat {
    private client = new tmi.Client({
        options: { debug: true },
        identity: {
            username: 'zokyamedia',
            password: 'oauth:'
        },
        channels: ['zokyamedia']
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
        this.client.say('zokyamedia', msg);
    }
}