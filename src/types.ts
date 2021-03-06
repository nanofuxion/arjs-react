import { arcType, arjsType, gateway } from "connectors/types";
import { ReactNode } from "react";

export type Status = 'connected' | 'disconnected' | 'connecting' | 'failed'
export type Provider = 'arweave' | 'arconnect' | 'disconnected'

export type arType = arjsType | arcType | null;

export type smartweave = { 
    write: (input: any, id: string, _key?: any) => Promise<any>; 
    iread: (input: any, id: string, _key?: any) => Promise<any>; 
    read: (id: string) => Promise<any>; 
}; 

export type Wallet ={
    connect: (connector: any, perms: any) => Promise<void>;
    status: Status;
    arweave: arType;
    provider: Provider;
    ready: (startFunc: any) => void;
    poll: (pollFunc: any) => void;
    isloading: number;
    disconnect: () => void;
    smartweave: smartweave;
};

export type WalletContext = {
    wallet: Wallet;
    arweave: arType;
} | null

export type Props = {
    connectors: object;
    enableSWC: boolean;
    sessionType: string;
    pollingRate: number;
    gateway: gateway;
    children: ReactNode;
};
