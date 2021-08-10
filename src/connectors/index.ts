import { Arc } from './arconnect'
import { Arjs } from './arweave-js'

export function connectors(connector: Array<any>, swc: boolean):any {
    return {
        connectAr: async function (wallet: any, loadStatus: any, key: any) {
            switch (wallet) {
                case "arweave":
                    return (connector.indexOf(wallet) != -1) ? await Arjs(key, loadStatus, swc) : ""
                case "arconnect":
                    return (connector.indexOf(wallet) != -1) ? await Arc(key, loadStatus, swc) : ""
                default: throw new console.error("error here")
            }
        }
    }
}

