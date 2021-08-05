import { ReactNode } from "react";

export type Status = 'connected' | 'disconnected' | 'connecting' | 'failed'
export type Provider = 'arweave' | 'arconnect' | 'disconnected'

export type Wallet ={
    connect: (connector: any, perms: any) => void;
    status: Status;
    provider: Provider;
    arweave: {};
    disconnect: () => void;
};

export type WalletContext = {
    wallet: Wallet;
    arweave: {};
} | null

export type Props = {
    connectors: object;
    enableSWC: boolean;
    sessionType: string
    children: ReactNode;
};