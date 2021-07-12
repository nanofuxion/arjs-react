import React from "react";
import { createContext, useContext, ReactNode, useState } from "react";
import { connectors as arConnector } from './connectors/index';


type WalletContext = {
    launch: () => void;
    enabled: { enabled: any[]; enableSWC: boolean;}
    wallet: any;
} | null

const ArjsContextDefaultValues: WalletContext = {


    launch: () => {},
    enabled: {enabled: [], enableSWC: false},
    wallet: arConnector([], false),
};



const ArjsContext = createContext<WalletContext>(ArjsContextDefaultValues);

export function useArjs() {
    return useContext(ArjsContext);
}

type Props = {
    connectors: object;
    enableSWC: boolean;
    children: ReactNode;
};

export { arConnector as connectors }

export function ArjsProvider({ connectors, enableSWC = false, children }: Props) {
    const [enabled, setEnabled] = useState<Array<any>>([]);
    const [swc, setSwc] = useState<boolean>(false);
    const [wallet, setWallet] = useState<any>();

    let list:Array<any> = []; 
    for(const connector in connectors) {
        if(connector == "arweave" && connectors[connector]==true)
        list.push(connector)

        if(connector == "arconnect" && connectors[connector]==true)
        list.push(connector)
    };

    const launch = () => {
            setEnabled(list);
            setSwc(enableSWC)
            setWallet(arConnector(enabled, enableSWC))
    };



    const value = {
        launch,
        enabled: {enabled , enableSWC: swc},
        wallet,
    };

    return (
        <>
            <ArjsContext.Provider value={value}>
                {children}
            </ArjsContext.Provider>
        </>
    );
}