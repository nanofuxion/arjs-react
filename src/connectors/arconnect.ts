import Arweave from 'arweave';
import { interactWrite, readContract, interactRead } from "./smartweave";
import { arcType } from './types';


function getSafe(fn: () => any, defaultVal: string) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}
let selfAddy: string,
    setAw: boolean = false;

export async function Arc(key: { [x: string]: any; permissions: any }, loadStatus: (arg0: string) => any, swc: boolean) {
    let permissions = key.permissions, 
    name = getSafe(key["name"], ""), 
    logo = getSafe(key["logo"], "");

    async function awStat(){
        setAw == true;
        try {
            await window.arweaveWallet.connect([...permissions, "ACCESS_ADDRESS"], { name, logo });
        } catch (error) {
            throw error
        }
    }

    let arweave: Arweave;
    let Arw: Arweave;

    async function setArweave(){
        Arw = await Arweave.init({ host: 'arweave.net' });
        // @ts-ignore
        let arweaveBase : Arweave = await window.Arweave.init({ host: 'arweave.net' });
        arweave = arweaveBase;
        arweave.blocks = Arw.blocks;
        selfAddy = await new Promise (async resolve => resolve(await window.arweaveWallet.getActiveAddress()));
    }

    // await window.addEventListener("arweaveWalletLoaded", async () => {
    //     await awStat().then(async ()=>{
    //         await setTimeout(async () => {
    //         let Arw: Arweave = await Arweave.init({ host: 'arweave.net' });
    //         // @ts-ignore
    //         let arweaveBase: Arweave = await window.Arweave.init({ host: 'arweave.net' });
    //         arweave = arweaveBase;
    //         arweave.blocks = Arw.blocks;
    //         selfAddy = await new Promise (async resolve => resolve(await window.arweaveWallet.getActiveAddress()));
    //         }, 1000);
    //     })
    // })
    if(!setAw){
            await awStat().then(async ()=> await setArweave())
        }



        return await <arcType>{

        transaction: async function (data) {
            return await arweave.createTransaction(data)
        },

        post: async function (transaction) {
            let data:any;
            await loadStatus("add");
            await arweave.transactions.post(transaction)
            .then(result => data = result)
            await loadStatus("sub");
            return data;
        },

        addTag: function (transaction, name, value) {
            transaction.addTag(name, value)
        },

        sign: async function (transaction) {
            await loadStatus("add");
            await arweave.transactions.sign(transaction);
            await loadStatus("sub");
        },

        submit: async function (transaction) {
            return await arweave.transactions.getUploader(transaction)
        },

        smartweave: {
            write: async (input, id) =>{
                let data:any;
                await loadStatus("add");
                (swc) ? await interactWrite(arweave, 'use_wallet', id, input)
                .then(result => data = result) : ""
                await loadStatus("sub");
                return data;
                },
            iread: async (input, id) =>{
                let data:any;
                await loadStatus("add");
                (swc) ? await interactRead(arweave, 'use_wallet', id, input)
                .then(result => data = result) : ""
                await loadStatus("sub");
                return data;
                },
            read: async (id) =>{
                let data:any;
                await loadStatus("add");
                (swc) ? await readContract(arweave, id)
                .then(result => data = result) : ""
                await loadStatus("sub");
                return data;
            },
        },

        getArweave: function () {
            return arweave;
        },

        //arconnect specific 
 
        disconnect: function () {
            window.arweaveWallet.disconnect();
        },

        getBalance: async function (this: any, walletID = 'self', setAttr = () => { }) {
            // @ts-ignore
            walletID = (walletID == 'self') ? selfAddy : walletID
            return new Promise (async (resolve) =>{
                await Arw.wallets.getBalance(walletID).then((balance) => {
                    setAttr(balance);
                    resolve(balance)
                })
            });
        },
        getAddress: function (setAttr = () => { }) {
            return new Promise(async (resolve) => {
                try {
                    await window.arweaveWallet.getActiveAddress().then(res => {
                        setAttr(res);
                        resolve(res);
                    });
                } catch (error) {
                    resolve(selfAddy);
                    setAttr(selfAddy);
                }
            })
        },
    }
}