import Transaction from "arweave/node/lib/transaction";
import { interactWrite, readContract } from "./smartweave";

function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}
let aw: any = () => { getActiveAddress: Function}, 
    selfAddy: any =  "",
    setAw: boolean = false;

export async function Arc(key: any, swc: boolean) {
    let permissions = getSafe(key["permissions"], ["ACCESS_ADDRESS"]), 
    name = getSafe(key["name"], ""), 
    logo = getSafe(key["logo"], "");

    async function awStat(){
        aw = window.arweaveWallet;
        console.log(aw)
        setAw == true;
        try {
            await window.arweaveWallet.connect([...permissions], { name, logo });
        } catch (error) {
            console.info("connected")
        }
    }
    window.addEventListener("arweaveWalletLoaded", async () => {
        await awStat()
    })

    await setTimeout(async () => {
        if(!setAw){
            await awStat()
        }
    }, 1000);

    // @ts-ignore
    const arweave = await window.Arweave.init({ host: 'arweave.net' });
    selfAddy = await new Promise (async resolve => resolve(await window.arweaveWallet.getActiveAddress()));
    


    return ({

        transaction: async function (data: any) {
            return await arweave.createTransaction(data)
        },

        post: async function (transaction: Transaction) {
            return await arweave.transactions.post(transaction)
        },

        addTag: function (transaction: Transaction, name: string, value: string) {
            transaction.addTag(name, value)
        },

        sign: async function (transaction: Transaction) {
            await arweave.transactions.sign(transaction)
        },

        submit: async function (transaction: Transaction) {
            return await arweave.transactions.getUploader(transaction)
        },

        smartweave: {
            write: async (input: any, id: string) =>
                (swc) ? await interactWrite(arweave, 'use_wallet', id, input) : "",
            read: async (id) =>
                (swc) ? await readContract(arweave, id) : "",
        },

        getArweave: function () {
            return arweave;
        },

        //arconnect specific 

        disconnect: function () {
            window.arweaveWallet.disconnect();
        },

        getBalance: async function (this: any, walletID: string = 'self', setAttr: any = () => { }) {
            // @ts-ignore
            walletID = (walletID == 'self') ? selfAddy : walletID
            console.log("self addy in getBalance: ",selfAddy)
            return new Promise (async (resolve) =>{
                await arweave.wallets.getBalance(walletID).then((balance) => {
                    setAttr(balance);
                    resolve(balance)
                })
            });
        },
        getAddress: function (setAttr: any = () => { }) {
            return new Promise(async (resolve) => {
                try {
                    await window.arweaveWallet.getActiveAddress().then(res => {
                        setAttr(res)
                        resolve(res)
                    });
                } catch (error) {
                    resolve(selfAddy)
                    setAttr(selfAddy)
                }
            })
        },
    })
}