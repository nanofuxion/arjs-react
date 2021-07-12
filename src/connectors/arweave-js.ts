import Arweave from 'arweave';
import Transaction from "arweave/node/lib/transaction";
import { interactWrite, readContract } from "./smartweave";

export function Arjs (key: any, swc){

    let arweave: Arweave;
    arweave = Arweave.init({});

    return {
        transaction: function (data: any) {
            let transaction: any;
            (async () =>
                transaction = await arweave.createTransaction(data, key)
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
                await arweave.transactions.sign(transaction, key)
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
        (swc)? await interactWrite(arweave, key, id, input):"",
        read: async (id) => 
        (swc)? await readContract(arweave, id):""
        }

    }

}