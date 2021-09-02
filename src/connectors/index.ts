import { Arc } from './arconnect'
import { Arjs } from './arweave-js'

export function connectors(connector: Array<any>, swc: boolean):any {
    return {
        connectAr: async function (wallet: any, loadStatus: any, key: any, gateway) {
            switch (wallet) {
                case "arweave":
                    return (connector.indexOf(wallet) != -1) ? await Arjs(key, loadStatus, swc, gateway) : ""
                case "arconnect":
                    return (connector.indexOf(wallet) != -1) ? await Arc(key, loadStatus, swc, gateway) : ""
                default: throw new console.error("error here")
            }
        }
    }
}

