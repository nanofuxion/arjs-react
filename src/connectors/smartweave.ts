import { interactWrite as write } from 'smartweave'
import { readContract as read } from 'smartweave'

type tags = { name: string; value: string }[]

export const interactWrite = async (arweave, wallet, contractId, input) => {

    const tags:tags = [
    {name: "App-Name", value: "SmartWeaveAction"}, 
    {name: "App-Version", value: "0.3.0"}, 
    {name: "Contract-Src", value: contractId}, 
    ]
    console.log(wallet)
    console.log(input)
    return await write(arweave, wallet, contractId, input, tags)
}

export const readContract = async (arweave, contractId) => {
    return await read(arweave, contractId)
}