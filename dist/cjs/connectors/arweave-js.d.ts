import Arweave from 'arweave';
import Transaction from "arweave/web/lib/transaction";
export declare function Arjs(key: any, swc: any): Promise<{
    transaction: (data: any, _key?: any) => Promise<import("arweave/node/lib/transaction").default>;
    post: (transaction: Transaction) => Promise<{
        status: number;
        statusText: string;
        data: any;
    }>;
    addTag: (transaction: Transaction, name: string, value: string) => void;
    sign: (transaction: Transaction, _key?: any) => Promise<void>;
    submit: (transaction: Transaction) => Promise<import("arweave/node/lib/transaction-uploader").TransactionUploader>;
    smartweave: {
        write: (input: any, id: string, _key?: any) => Promise<string>;
        read: (id: string) => Promise<any>;
    };
    getArweave: () => Arweave;
    getBalance: (this: any, walletID?: string, setAttr?: any) => Promise<unknown>;
    getAddress: (this: any, setAttr?: any) => Promise<unknown>;
}>;
//# sourceMappingURL=arweave-js.d.ts.map