import { arType } from "/types";
import React, { useEffect, createContext, useContext, useState, useMemo, useCallback } from "react";
import { connectors as arConnector } from './connectors/index';
import { readContract } from "./connectors/smartweave";
// import { session } from './sesssionUtils/sessionStorage';
import { WalletContext, Wallet, Props, Status, Provider } from './types'
import Arweave from "arweave";

const UseArjsContext = createContext<WalletContext>(null);

let incrementor = 0;

export function useArjs(): Wallet {
    const walletContext = useContext(UseArjsContext);

    if (walletContext === null) {
        throw new Error(
            'useArjs() can only be used inside of <ArjsProvider />, ' +
            'please declare it at a higher level.'
        )
    }

    const { wallet, arweave } = walletContext
    return useMemo(() => {
        return  { ...arweave, ...wallet}
    }, [wallet, arweave])
}

export { arConnector as connectors }

export function ArjsProvider({ connectors, enableSWC = false, pollingRate = 5000, children }: Props) {
    const walletContext = useContext(UseArjsContext);

    if (walletContext !== null) {
        throw new Error('<ArjsProvider /> has already been declared.')
    }
    const [status, setStatus] = useState<Status>('disconnected'),
    [provider,setProvider] = useState<Provider>('disconnected'),
    [arweave, setArweave] = useState<arType>(null),
    // [dir,setDir] = useState<string>(''),
    [isloading,setIsloading] = useState<number>(0);
    // [balance,setBalance] = useState<string | any>("0");

    // let balance: string = "0";

    let list: Array<any> = [];
    for (const connector in connectors) {
        if (connector == "arweave" && connectors[connector]) {
            list.push(connector)
        }

        if (connector == "arconnect" && connectors[connector])
            list.push(connector)
    };

    const [enabledList, setEnabledList] = useState<Array<string>>(list);

    useEffect(() => {
        setEnabledList(list);
    }, []);

    let Aggr = useMemo(() => {
        return arConnector(enabledList, enableSWC);
    }, [enabledList]);

    const loadStatus = async (action: string) => {

            switch (action) {
                case "add":
                    incrementor = incrementor + 1;
                    setIsloading(incrementor)
                    break;
                case "sub":
                    incrementor = incrementor - 1;
                    ((isloading - 1) == -1)? 
                    setIsloading(0): 
                    setIsloading(incrementor)
                    break;
                default: break;
            }
    }

    const disconnect = useCallback(() => {
        setIsloading(0);
        setStatus('disconnected');
        setProvider('disconnected');
        // session.delSession("walletSession")
        // session.delSession("arweaveWallet")
    }, [            
        status,
        arweave,
        provider,
        loadStatus,
        isloading,
    ]);

    const connect = useCallback(async (connector, perms) => {
        // disconnect()
        setStatus('connecting');
            await Aggr.connectAr(connector, loadStatus, perms).then(async (result)=>{
                await setArweave(await result);
                setProvider(connector);
                setStatus('connected');
            }).catch (err=>{ 
                setStatus('failed')
                throw `failed to connect to ${connector}: ${err}`
            });
    }, [disconnect, loadStatus]);

    const poll = (pollFunc, rate: number = pollingRate) => useEffect(() => {
        if(status == "connected"){
            pollFunc();
        const tick = () =>{
            pollFunc();
        }
        if(rate != null){
            const id = setInterval(tick, rate);
            return () => {
                clearInterval(id);
            };
        }
    }
        return;
    }, [pollingRate,status,arweave])

    const ready = (startFunc) => useEffect(() => {
        if(status == "connected"){
            startFunc()
        }
    },[status,arweave]);


    const smartweave = {

        read: async (id: string) =>{
            let arweave: Arweave = await Arweave.init({ host: 'arweave.net' });
            let data:any;
            loadStatus("add");
            try {
                (enableSWC) ? await readContract(arweave, id)
            .then(result => data = result) : ""
            } catch (error) {
                data = "";
            }
            loadStatus("sub");
            return data;
        },
    }


    const wallet: Wallet = useMemo(
        () => ({
            connect,
            status,
            arweave,
            provider,
            ready,
            poll,
            smartweave,
            isloading,
            disconnect
        }),
        [
            connect,
            status,
            arweave,
            provider,
            isloading,
            loadStatus,
            disconnect,
        ])


    return (
        <UseArjsContext.Provider value={{
            wallet,
            arweave,
        }}>
            {children}
        </UseArjsContext.Provider>
    );
}