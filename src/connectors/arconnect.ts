// import { useState, useEffect } from "react";
import Arweave from 'arweave';
import Transaction from "arweave/node/lib/transaction";
import { interactWrite, readContract } from "./smartweave";

function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export class Arc{ 
    transaction: (data: any) => void;
    post: (transaction: Transaction) => void;
    addTag: (transaction: Transaction, name: string, value: string) => void;
    sign: (transaction: Transaction, name: string, value: string) => void;
    submit: (transaction: Transaction) => void;
    arweave!: Arweave;
    swc!: { interactWrite: (arweave: any, wallet: any, contractId: any, input: any) => Promise<string>; readContract: (arweave: any, contractId: any) => Promise<any>; };

    constructor (key: any, swc: boolean){
        let arweave: Arweave;
        let that = this

        let permissions = key.permissions, name = getSafe(key["name"], ""), logo = getSafe(key["logo"], "");
                window.arweaveWallet.connect([...permissions],
                    {
                        name,
                        logo
                    })
                window.addEventListener("arweaveWalletLoaded", () => {
                    // @ts-ignore
                    arweave = window.Arweave.init();
                    that.arweave = arweave;
                });

        this.transaction = (data: any) =>{
            let transaction: any;
                (async () => 
                    transaction = await arweave.createTransaction(data)
                )()
            return transaction;
        }



        this.post = (transaction: Transaction,) =>{
            let response: any;
                (async () => 
                    response = await arweave.transactions.post(transaction)
                )()
            return response;
        }

        this.addTag = (transaction: Transaction, name: string, value: string) =>{
                (async () => 
                    await transaction.addTag(name, value)
                )()
        }

        this.sign = async(transaction: Transaction) =>{
                (async () => 
                    await arweave.transactions.sign(transaction)
                )()
        }

        this.submit = (transaction: Transaction) =>{
            let uploader: any;
                (async () => 
                    uploader = await arweave.transactions.getUploader(transaction)
                )()
            return uploader;
        }

        if(swc){
            this.swc = {interactWrite, readContract}
        }

    }
}