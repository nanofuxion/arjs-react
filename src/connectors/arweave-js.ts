import Arweave from 'arweave';
import { interactWrite, readContract, interactRead } from "./smartweave";
import { arjsType, gateway } from './types';

let selfAddy: any =  "";

export async function Arjs(key: any, loadStatus: any, swc: any, gateway: gateway) {
    let arweave: Arweave = await Arweave.init( gateway );
    console.log(arweave)
    key = (typeof key == 'string')? JSON.parse(key) : key;
    if(!key['kty']) throw "Data Input is not a arweave key."

        selfAddy = await new Promise (async resolve => resolve(await arweave.wallets.jwkToAddress(key)));

        return await <arjsType>{

        transaction: async function (data: any, _key: any = key) {
            return await arweave.createTransaction(data, _key);
        },

        post: async function (transaction) {
            let data:any;
            await loadStatus("add");
            await arweave.transactions.post(transaction)
            .then(result => data = result)
            await loadStatus("sub");
            return data;
        },

        addTag: function (transaction, name: string, value: string) {
            transaction.addTag(name, value);
        },

        sign: async function (transaction, _key: any = key) {
            await loadStatus("add");
            await arweave.transactions.sign(transaction, _key);
            await loadStatus("sub");
        },

        submit: async function (transaction) {
            return await arweave.transactions.getUploader(transaction);
        },

        smartweave: {
            write: async (input: any, id: string, _key: any = key, tags?, target?, winstonQty?) =>{
                let data:any;
                await loadStatus("add");
                try {
                    (swc) ? await interactWrite(arweave, _key, id, input, tags, target, winstonQty)
                .then(result => data = result) : ""
                } catch (error) {
                    data = "";
                }
                finally{
                    await loadStatus("sub");
                }
                
                return data;
            },
            iread: async (input: any, id: string, _key: any = key, tags?, target?, winstonQty?) =>{
                let data:any;
                await loadStatus("add");
                try {
                    (swc) ? await interactRead(arweave, _key, id, input, tags, target, winstonQty)
                .then(result => data = result) : ""
                } catch (error) {
                    data = "";
                }
                finally{
                    await loadStatus("sub");
                }
                return data;
            },
            read: async (id: string) =>{
                let data:any;
                
                try {
                    await loadStatus("add");
                    (swc) ? await readContract(arweave, id)
                .then(result => data = result) : ""
                } catch (error) {
                    data = "";
                }
                finally{
                    await loadStatus("sub");
                }
                return data;
            },
        },

        getArweave: function () {
            return arweave;
        },

        //arweave specific

        disconnect: function () {},

        getBalance: async function (this: any, walletID: string = 'self', setAttr: any = () => { }) {
            // @ts-ignore
            walletID = (walletID == 'self') ? selfAddy : walletID
            return await new Promise (async (resolve) =>{
                await arweave.wallets.getBalance(walletID).then((balance) => {
                    setAttr(balance);
                    resolve(balance);
                })
            });
        },

        getAddress: async function (this: any, setAttr: any = () => { }) {
            return await new Promise (async (resolve) =>{
                await arweave.wallets.jwkToAddress(key).then((addy) => {
                    setAttr(addy);
                    resolve(addy);
                });
            })
        },

    }
}

