// import { useState, useEffect } from "react";
// import Arweave from 'arweave';
import Transaction from "arweave/node/lib/transaction";
import { interactWrite, readContract } from "./smartweave";

function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export function Arc(key: any, swc: boolean) {


    let permissions = key.permissions, name = getSafe(key["name"], ""), logo = getSafe(key["logo"], "");
    window.arweaveWallet.connect([...permissions],
        {
            name,
            logo
        })
        // @ts-ignore
        const arweave = window.Arweave.init();

    return {
        transaction: function (data: any) {
            let transaction: any;
            (async () =>
                transaction = await arweave.createTransaction(data)
            )()
            return transaction;
        },



        post: function (transaction: Transaction) {
            let response: any;
            (async () =>
                response = await arweave.transactions.post(transaction)
            )()
            return response;
        },

        addTag: function (transaction: Transaction, name: string, value: string) {
            (async () =>
                await transaction.addTag(name, value)
            )()
        },

        sign: async function (transaction: Transaction) {
            (async () =>
                await arweave.transactions.sign(transaction)
            )()
        },

        submit: function (transaction: Transaction) {
            let uploader: any;
            (async () =>
                uploader = await arweave.transactions.getUploader(transaction)
            )()
            return uploader;
        },

        smartweave: {
        write: async (input: any, id: string) => 
        (swc)? await interactWrite(arweave, 'use_wallet', id, input):"",
        read: async (id) => 
        (swc)? await readContract(arweave, id):""
        }

    }
}