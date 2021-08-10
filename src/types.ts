import { arcType, arjsType } from "connectors/types";
import { ReactNode } from "react";

export type Status = 'connected' | 'disconnected' | 'connecting' | 'failed'
export type Provider = 'arweave' | 'arconnect' | 'disconnected'

export type arType = arjsType | arcType | null;

export type Wallet ={
    connect: (connector: any, perms: any) => Promise<void>;
    status: Status;
    arweave: arType;
    provider: Provider;
    ready: (startFunc: any) => void;
    isloading: number;
    disconnect: () => void;
};

export type WalletContext = {
    wallet: Wallet;
    arweave: arType;
} | null

export type Props = {
    connectors: object;
    enableSWC: boolean;
    sessionType: string
    children: ReactNode;
};
