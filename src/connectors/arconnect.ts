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

export async function Arc(key: any, swc: boolean) {


    let permissions = key.permissions, name = getSafe(key["name"], ""), logo = getSafe(key["logo"], "");
    let aw: any = () => {};
        window.addEventListener("arweaveWalletLoaded", async () => {
            await window.arweaveWallet.connect([...permissions], { name, logo });
            aw = window.arweaveWallet;
        });
        // @ts-ignore
        const arweave = await window.Arweave.init({ host: 'arweave.net' });

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
        (swc)? await readContract(arweave, id):"",
        },

        getArweave: function () {
            return arweave;
        },

        //arconnect specific 
        disconnect: function () {
            aw.disconnect();
        },

        getArweaveWallet: function () {
            return aw;
        },

    }
}