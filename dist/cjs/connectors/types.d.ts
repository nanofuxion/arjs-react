import Arweave from 'arweave';
import { CreateTransactionInterface } from 'arweave/node/common';
import Transaction from "arweave/node/lib/transaction";
import { TransactionUploader } from 'arweave/node/lib/transaction-uploader';
export declare type arcType = {
    transaction: (data: Partial<CreateTransactionInterface>) => Promise<Transaction>;
    post: (transaction: Transaction) => Promise<{
        status: number;
        statusText: string;
        data: any;
    }>;
    addTag: (transaction: Transaction, name: string, value: string) => void;
    sign: (transaction: Transaction) => Promise<void>;
    submit: (transaction: Transaction) => Promise<TransactionUploader>;
    smartweave: {
        write: (input: any, id: string) => Promise<any>;
        iread: (input: any, id: string) => Promise<any>;
        read: (id: string) => Promise<any>;
    };
    getArweave: () => Arweave;
    disconnect: () => void;
    getBalance: (this: any, walletID?: string, setAttr?: any) => Promise<unknown>;
    getAddress: (setAttr?: any) => Promise<unknown>;
};
export declare type arjsType = {
    transaction: (data: any, _key?: any) => Promise<Transaction>;
    post: (transaction: Transaction) => Promise<{
        status: number;
        statusText: string;
        data: any;
    }>;
    addTag: (transaction: Transaction, name: string, value: string) => void;
    sign: (transaction: Transaction, _key?: any) => Promise<void>;
    submit: (transaction: Transaction) => Promise<TransactionUploader>;
    smartweave: {
        write: (input: any, id: string, _key?: any) => Promise<any>;
        iread: (input: any, id: string, _key?: any) => Promise<any>;
        read: (id: string) => Promise<any>;
    };
    getArweave: () => Arweave;
    disconnect: () => void;
    getBalance: (this: any, walletID?: string, setAttr?: any) => Promise<unknown>;
    getAddress: (this: any, setAttr?: any) => Promise<unknown>;
};
export declare type gateway = {
    host: '127.0.0.1' | string;
    port: number;
    protocol: 'http' | 'https';
} | {};
//# sourceMappingURL=types.d.ts.map