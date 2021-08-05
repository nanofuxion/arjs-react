import { Arc } from './arconnect'
import { Arjs } from './arweave-js'

export function connectors(enabled: Array<any>, swc: boolean):any {
    return {
        connectAr: async function (wallet: any, key: any) {
            switch (wallet) {
                case "arweave":
                    return (enabled.indexOf(wallet) != -1) ? 
                    await Arjs(key, swc) : ""
                case "arconnect":
                    return (enabled.indexOf(wallet) != -1) ? 
                    await Arc(key, swc) : ""
                default: throw new console.error("error here")
            }
        }
    }
}

