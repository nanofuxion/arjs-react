import React, { useEffect, createContext, useContext, useState, useMemo, useCallback } from "react";
import { connectors as arConnector } from './connectors/index';
import { session } from './sesssionUtils/sessionStorage';
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
        // @ts-ignore
        return { ...arweave, ...wallet}
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
    [arweave, setArweave] = useState<any>({})
    

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
    }, [])

    let Aggr = useMemo(() => {
        return arConnector(enabledList, enableSWC);
    }, [enabledList]);


    const disconnect = useCallback(() => {
        setStatus('disconnected');
        setProvider('disconnected');
        session.delSession("walletSession")
        session.delSession("arweaveWallet")
    }, []);

    const connect = useCallback(async (connector, perms) => {
        disconnect()
        setStatus('connecting');

            await Aggr.connectAr(connector, perms).then(async (result)=>{
                await setArweave(await result);
                setProvider(connector);
                setStatus('connected');
            }).catch (err=>{ 
                setStatus('failed')
                throw `failed to connect to ${connector}: ${err}`
            });
    }, [disconnect])

    const wallet = useMemo(
        () => ({
            connect,
            status,
            arweave,
            provider,
            disconnect
        }),
        [
            connect,
            status,
            arweave,
            provider,
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