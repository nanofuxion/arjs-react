import { Arc } from './arconnect'
import { Arjs } from './arweave-js'
import { ApiConfig } from "arweave/node/lib/api";

export class connectors{
    connect: (wallet: string, key: any, apiConfig?: ApiConfig) => void; 
    arweave: any;
    constructor(enabled: Array<any>, swc: boolean){

            let that = this

        this.connect = (wallet, key, apiConfig) => {
            console.log(wallet)
            switch(wallet) {
                case "arweave":
                    if(enabled.indexOf(wallet)!=-1)
                    that.arweave = new Arjs(key, apiConfig, swc)
                break;
                case "arconnect":
                    if(enabled.indexOf(wallet)!=-1)
                    that.arweave = new Arc(key, swc)
                break;
                default:
                    if(enabled.indexOf("arweave")!=-1)
                    that.arweave = new Arjs(key, apiConfig, swc)
            }
        }
    }
}
