import { JWKInterface } from 'arweave/node/lib/wallet'
import { interactWrite as write } from 'smartweave'
import { interactRead as iread } from 'smartweave'
import { readContract as read } from 'smartweave'

type tags = { name: string; value: string }[]

export const interactWrite = async (arweave: import("arweave"), wallet: "use_wallet" | JWKInterface, contractId: string, input: string) => {

    const tags:tags = [
    {name: "App-Name", value: "SmartWeaveAction"}, 
    {name: "App-Version", value: "0.3.0"}, 
    {name: "Contract-Src", value: contractId}, 
    ]
    let inputJson = JSON.parse(input)
    console.log(inputJson)
    return await write(arweave, wallet, contractId, inputJson, tags)
}

export const interactRead = async (arweave: import("arweave"), wallet: "use_wallet" | JWKInterface | undefined, contractId: string, input: string) => {

    const tags:tags = [
    {name: "App-Name", value: "SmartWeaveAction"}, 
    {name: "App-Version", value: "0.3.0"}, 
    {name: "Contract-Src", value: contractId}, 
    ]
    let inputJson = JSON.parse(input)
    console.log(inputJson)
    return await iread(arweave, wallet, contractId, inputJson, tags)
}

export const readContract = async (arweave: import("arweave"), contractId: string) => {
    return await read(arweave, contractId)
}