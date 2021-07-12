import { Arc } from './arconnect'
import { Arjs } from './arweave-js'

// let arweave: any;

export function connectors(enabled: Array<any>, swc: boolean) {
    return {
        arweave: {},
        connect: function (wallet: any, key: any) {
            console.log(wallet)
            switch (wallet) {
                case "arweave":
                    if (enabled.indexOf(wallet) != -1)
                        this.arweave = Arjs(key, swc)
                    break;
                case "arconnect":
                    if (enabled.indexOf(wallet) != -1)
                        this.arweave = Arc(key, swc)
                    break;
                default:
                    if (enabled.indexOf("arweave") != -1)
                        this.arweave = Arjs(key, swc)
            }
        }
    }
}

