import { useState, useEffect } from "react";
import Arweave from 'arweave';
import { ApiConfig } from "arweave/node/lib/api";
import Transaction from "arweave/node/lib/transaction";
import { interactWrite, readContract } from "./smartweave";

export class Arjs{ 
    connect: (permissions: string[], name?: string, logo?: string) => void;
    transaction: (data: any) => void;
    post: (transaction: Transaction) => void;
    addTag: (transaction: Transaction, name: string, value: string) => void;
    sign: (transaction: Transaction, name: string, value: string) => void;
    submit: (transaction: Transaction) => void;
    arweave!: Arweave;
    swc!: { interactWrite: (arweave: any, wallet: any, contractId: any, input: any) => Promise<string>; readContract: (arweave: any, contractId: any) => Promise<any>; };

    constructor (key: any, apiConfig: ApiConfig = {
    host: 'arweave.net',
    port: 1984,
    protocol: 'http'
}, swc){

    let arweave: Arweave;
    let that = this

        this.connect = () => {
            useEffect(() => {
                arweave = Arweave.init(apiConfig);
                that.arweave = arweave;
            }, [])
        }

        this.transaction = (data) =>{
            const [transaction, setTransaction] = useState<any | void>()
            useEffect(() => {
                (async () => 
                    setTransaction(await arweave.createTransaction(data, key))
                )()
            }, [transaction])
            return transaction;
        }

        this.post = (transaction) =>{
            const [response, setResponse] = useState<any | void>()
            useEffect(() => {
                (async () => 
                    setResponse(await arweave.transactions.post(transaction))
                )()
            }, [response])
            return response;
        }

        this.addTag = (transaction, name, value) =>{
            const [tags, setTag] = useState<any | void>()
            useEffect(() => {
                (async () => 
                    setTag(await transaction.addTag(name, value))
                )()
            }, [tags])
        }

        this.sign = async(transaction) =>{
            const [sig, setSig] = useState<any | void>()
            useEffect(() => {
                (async () => 
                    setSig(await arweave.transactions.sign(transaction))
                )()
            }, [sig])
        }

        this.submit = (transaction: Transaction) =>{
            const [uploader, setUploader] = useState<any | void>()
            useEffect(() => {
                (async () => 
                    setUploader(await arweave.transactions.getUploader(transaction))
                )()
            }, [uploader])
            return uploader;
        }

        if(swc){
            this.swc = {interactWrite, readContract}
        }

    }
}