import { arcType, arjsType } from "connectors/types";
import { ReactNode } from "react";
export declare type Status = 'connected' | 'disconnected' | 'connecting' | 'failed';
export declare type Provider = 'arweave' | 'arconnect' | 'disconnected';
export declare type arType = arjsType | arcType | null;
export declare type Wallet = {
    connect: (connector: any, perms: any) => Promise<void>;
    status: Status;
    arweave: arType;
    provider: Provider;
    ready: (startFunc: any) => void;
    isloading: number;
    disconnect: () => void;
};
export declare type WalletContext = {
    wallet: Wallet;
    arweave: arType;
} | null;
export declare type Props = {
    connectors: object;
    enableSWC: boolean;
    sessionType: string;
    children: ReactNode;
};
//# sourceMappingURL=types.d.ts.map