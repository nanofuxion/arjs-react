import { ReactNode } from "react";
export declare type Status = 'connected' | 'disconnected' | 'connecting' | 'failed';
export declare type Provider = 'arweave' | 'arconnect' | 'disconnected';
export declare type Wallet = {
    connect: (connector: any, perms: any) => void;
    status: Status;
    provider: Provider;
    arweave: {};
    disconnect: () => void;
};
export declare type WalletContext = {
    wallet: Wallet;
    arweave: {};
} | null;
export declare type Props = {
    connectors: object;
    enableSWC: boolean;
    sessionType: string;
    children: ReactNode;
};
//# sourceMappingURL=types.d.ts.map