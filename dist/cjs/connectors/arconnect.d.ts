import Transaction from "arweave/node/lib/transaction";
export declare function Arc(key: any, swc: boolean): Promise<{
    transaction: (data: any) => Promise<any>;
    post: (transaction: Transaction) => Promise<any>;
    addTag: (transaction: Transaction, name: string, value: string) => void;
    sign: (transaction: Transaction) => Promise<void>;
    submit: (transaction: Transaction) => Promise<any>;
    smartweave: {
        write: (input: any, id: string) => Promise<string>;
        read: (id: any) => Promise<any>;
    };
    getArweave: () => any;
    disconnect: () => void;
    getBalance: (this: any, walletID?: string, setAttr?: any) => Promise<unknown>;
    getAddress: (setAttr?: any) => Promise<unknown>;
}>;
//# sourceMappingURL=arconnect.d.ts.map