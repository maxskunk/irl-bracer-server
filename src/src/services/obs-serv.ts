import { Observable, Subscriber } from "rxjs";

const OBSWebSocket = require('obs-websocket-js');
//import * as OBSWebSocket from 'obs-websocket-js';
const obs = new OBSWebSocket();

export class OBSService {
    private subscriber: Subscriber<Blob>;
    public preivewImage: Observable<any> = new Observable<any>();
    constructor() {

    }

    public connect() {
        this.preivewImage = new Observable<any>((observer) => {
            this.subscriber = observer;
        });
        this.connectToObs().then(() => {
            console.log("CONNECTED TO OBS");
            // this.getSceneList().then((data) => {
            //     console.log("WE GOT SCENES: " + JSON.stringify(data));
            // }).catch(err => { // Promise convention dicates you have a catch on every chain.
            //     console.log("ERROR: " + JSON.stringify(err));
            // });;


            //this.getPreview();
        }


        );
    }

    private async connectToObs() {
        return obs.connect({ address: 'localhost:4444', password: 'poopinmybutt' });
    }

    public async getSceneList(): Promise<any> {
        return obs.send('GetSceneList');
    }

    public getPreview() {
        obs.send('TakeSourceScreenshot', { sourceName: "MAIN", embedPictureFormat: 'png', width: 960, height: 540 }).then((data) => {
            this.subscriber.next(data.img);
        });

    }

}