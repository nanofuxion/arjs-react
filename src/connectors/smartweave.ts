import { JWKInterface } from 'arweave/node/lib/wallet'
import Arweave from 'arweave';
import { interactWrite as write } from 'smartweave'
import { interactRead as iread } from 'smartweave'
import { readContract as read } from 'smartweave'

export const interactWrite = async (arweave: Arweave, wallet: "use_wallet" | JWKInterface, contractId: string, input: string) => {

    let inputJson = JSON.parse(input)
    console.log(inputJson)
    return await write(arweave, wallet, contractId, inputJson)
}

export const interactRead = async (arweave: Arweave, wallet: "use_wallet" | JWKInterface | undefined, contractId: string, input: string) => {

    let inputJson = JSON.parse(input)
    console.log(inputJson)
    return await iread(arweave, wallet, contractId, inputJson)
}

export const readContract = async (arweave: Arweave, contractId: string) => {
    return await read(arweave, contractId)
}