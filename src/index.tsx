import React, { useCallback, useEffect, createContext, useContext, ReactNode, useState, useMemo } from "react";
import { connectors as arConnector } from './connectors/index';
import { session } from './sesssionUtils/sessionStorage';


type WalletContext = {
    launch: () => void;
    enabled: { enabled: any[]; enableSWC: boolean; }
    wallet: any;
} | null

const ArjsContextDefaultValues: WalletContext = {


    launch: () => { },
    enabled: { enabled: [], enableSWC: false },
    wallet: arConnector([], false),
};



const ArjsContext = createContext<WalletContext>(ArjsContextDefaultValues);

export function useArjs() {
    return useContext(ArjsContext);
}

type Props = {
    connectors: object;
    enableSWC: boolean;
    sessionType: string
    children: ReactNode;
};

export { arConnector as connectors }

export function ArjsProvider({ connectors, enableSWC = false, sessionType = "session", children }: Props) {
    const [enabled, setEnabled] = useState<Array<any>>([]);
    const [swc, setSwc] = useState<boolean>(false);
    const [sess, setSess] = useState<Array<string>>([]);
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [wallet, setWallet] = useState<any>({});

    let list: Array<any> = [];
    for (const connector in connectors) {
        if (connector == "arweave" && connectors[connector] == true) {
            list.push(connector)
        }

        if (connector == "arconnect" && connectors[connector] == true)
            list.push(connector)
    };

    const launch = () => {
        setEnabled(list);
        setSwc(enableSWC)
        setWallet(arConnector(enabled, enableSWC))
    };



    let Aggr = useMemo(() => {
        return arConnector(enabled, enableSWC);
    }, [enabled]);


    const activate = async (connector, perms, refresh = false) => {
        await Aggr.connect(connector, perms).then(
            /* @ts-ignore */
            () => setWallet(Aggr.arweave)
        );
        console.log(perms)
        if(refresh == false){
            session.storageType((connector == "arweave") ? sessionType : "local");
            session.setSession("walletSession", connector)
            session.setSession("arweaveWallet", (connector == "arweave") ? perms: JSON.stringify(perms))
        }
    }

    const disconnect = useCallback(async () => {
        // (session.getSession("walletSession") == "arconnect") ? wallet.disconnect() : null;
        session.delSession("walletSession")
        session.delSession("arweaveWallet")
        await setWallet({});
        await setEnabled([]);
    }, [wallet]);

    const value = {
        launch,
        enabled: { enabled, enableSWC: swc },
        activate,
        disconnect,
        wallet,
    };


    if (typeof window !== 'undefined') {
        if (typeof session.getSession("walletSession") == "string" &&
            typeof session.getSession("arweaveWallet") == "string"
            ) {

            useEffect(() => {
                console.log((session.getSession("walletSession")) ? 1 : 0)
                setSess([session.getSession("walletSession"), session.getSession("arweaveWallet")])

            }, []);

            const callback = useCallback(async () => {
                console.log(sess[0], sess[1])
                launch();
                (async () => {
                    activate(sess[0], sess[1], true)
                })();

            }, [sess])

            useEffect(() => {
                if (!isBusy) {
                    setIsBusy(true);
                    callback();
                    setIsBusy(false);
                }
            }, [callback]);

        }
    }

    return (
        <>
            <ArjsContext.Provider value={value}>
                {children}
            </ArjsContext.Provider>
        </>
    );
}