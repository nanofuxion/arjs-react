import React from "react";
import { createContext, useContext, ReactNode, useState } from "react";
import { connectors as arConnectors } from './connectors/index';


type WalletContext = {
    launch: () => void;
    enabled: Array<any>;
    swc: boolean;
} | null

const ArjsContextDefaultValues: WalletContext = {
    launch: () => {},
    enabled: [],
    swc: false,
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

export {arConnectors as connectors}

export function ArjsProvider({ connectors, enableSWC, children }: Props) {
    const [enabled, setEnabled] = useState<Array<any>>([]);
    const [swc, setSwc] = useState<boolean>(false);

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
    };



    const value = {
        launch,
        enabled,
        swc,
    };

    return (
        <>
            <ArjsContext.Provider value={value}>
                {children}
            </ArjsContext.Provider>
        </>
    );
}