import Arweave from 'arweave';
import Transaction from "arweave/web/lib/transaction";
import { interactWrite, readContract } from "./smartweave";

export function Arjs (key: any, swc){

    let arweave: Arweave;
    // @ts-ignore
    // window.Arweave = null,window.arweaveWallet = null;
    arweave = Arweave.init({});
      console.log(key)


    return {
        transaction: function (data: any, _key:any = key) {
            let transaction: any;
            (async () =>
                transaction = await arweave.createTransaction(data, _key)
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

        sign: async function (transaction: Transaction, _key:any = key) {
            (async () =>
                await arweave.transactions.sign(transaction, _key)
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
        write: async (input: any, id: string, _key:any = key) => {
            (swc)? await interactWrite(arweave, _key, id, input):""
        },
        read: async (id: string) => 
        (swc)? await readContract(arweave, id):""
        }

    }

}