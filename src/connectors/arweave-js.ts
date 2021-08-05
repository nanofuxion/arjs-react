import Arweave from 'arweave';
import Transaction from "arweave/web/lib/transaction";
import { interactWrite, readContract } from "./smartweave";

let selfAddy: any =  "";

export async function Arjs(key: any, swc: any) {
    let arweave: Arweave = await Arweave.init({ host: 'arweave.net' });
    key = (typeof key == 'string')? JSON.parse(key) : key;
    if(!key['kty']) throw "Data Input is not a arweave key."

        selfAddy = await new Promise (async resolve => resolve(await arweave.wallets.jwkToAddress(key)));

        return ({

        transaction: async function (data: any, _key: any = key) {
            return await arweave.createTransaction(data, _key);
        },

        post: async function (transaction: Transaction) {
            return await arweave.transactions.post(transaction);
        },

        addTag: function (transaction: Transaction, name: string, value: string) {
            transaction.addTag(name, value);
        },

        sign: async function (transaction: Transaction, _key: any = key) {
            await arweave.transactions.sign(transaction, _key);
        },

        submit: async function (transaction: Transaction) {
            return await arweave.transactions.getUploader(transaction);
        },

        smartweave: {
            write: async (input: any, id: string, _key: any = key) =>
                (swc) ? await interactWrite(arweave, _key, id, input) : "",
            read: async (id: string) =>
                (swc) ? await readContract(arweave, id) : "",
        },

        getArweave: function () {
            return arweave;
        },

        //arweave specific

        getBalance: async function (this: any, walletID: string = 'self', setAttr: any = () => { }) {
            // @ts-ignore
            walletID = (walletID == 'self') ? selfAddy : walletID
            console.log("self addy in getBalance: ",selfAddy)
            return await new Promise (async (resolve) =>{
                await arweave.wallets.getBalance(walletID).then((balance) => {
                    setAttr(balance);
                    resolve(balance)
                })
            });
        },

        getAddress: async function (this: any, setAttr: any = () => { }) {
            return await new Promise (async (resolve) =>{
                await arweave.wallets.jwkToAddress(key).then((addy) => {
                    setAttr(addy)
                    resolve(addy)
                });
            })
        },

    })
// })(key)
}


(async ()=> {
    let carDo;
    new Promise (async () =>{
        let car;
        await setTimeout(() => {
            car = "go Vroom"
        }, 1000);
        return car;
    }).then(result=>carDo = result)
    console.log(carDo)
})
