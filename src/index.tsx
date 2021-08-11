import { arType } from "/types";
import React, { useEffect, createContext, useContext, useState, useMemo, useCallback } from "react";
import { connectors as arConnector } from './connectors/index';
// import { session } from './sesssionUtils/sessionStorage';
import { WalletContext, Wallet, Props, Status, Provider } from './types'

const UseArjsContext = createContext<WalletContext>(null);

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

export function ArjsProvider({ connectors, enableSWC = false, children }: Props) {
    const walletContext = useContext(UseArjsContext);

    if (walletContext !== null) {
        throw new Error('<ArjsProvider /> has already been declared.')
    }
    const [status, setStatus] = useState<Status>('disconnected'),
    [provider,setProvider] = useState<Provider>('disconnected'),
    [arweave, setArweave] = useState<arType>(null),
    [isloading,setIsloading] = useState<number>(0)

    

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

    const loadStatus = useCallback(
        (action: string) => {
            switch (action) {
                case "sub":
                    setIsloading(isloading - 1)
                    return isloading;
                case "add":
                    setIsloading(isloading + 1)
                    return isloading;
                default: throw "error at loadStatus = useCallback"
            }
        },
        [
            isloading
        ])

    let Aggr = useMemo(() => {
        return arConnector(enabledList, enableSWC);
    }, [enabledList]);


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
        isloading,
        loadStatus
    ]);

    const connect = useCallback(async (connector, perms) => {
        disconnect()
        setStatus('connecting');
            await Aggr.connectAr(connector, loadStatus, perms).then(async (result)=>{
                await setArweave(await result);
                setProvider(connector);
                setStatus('connected');
            }).catch (err=>{ 
                setStatus('failed')
                throw `failed to connect to ${connector}: ${err}`
            });
    }, [disconnect])

    const ready = (startFunc) => useEffect(() => {
        if(status == "connected")startFunc()
    },[status,arweave])

    const wallet: Wallet = useMemo(
        () => ({
            connect,
            status,
            arweave,
            provider,
            ready,
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
            disconnect
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