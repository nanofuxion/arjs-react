import Transaction from "arweave/node/lib/transaction";
export declare function Arc(key: any, swc: boolean): Promise<{
    transaction: (data: any) => any;
    post: (transaction: Transaction) => any;
    addTag: (transaction: Transaction, name: string, value: string) => void;
    sign: (transaction: Transaction) => Promise<void>;
    submit: (transaction: Transaction) => any;
    smartweave: {
        write: (input: any, id: string) => Promise<string>;
        read: (id: any) => Promise<any>;
    };
    getArweave: () => any;
    disconnect: () => void;
    getArweaveWallet: () => any;
}>;
//# sourceMappingURL=arconnect.d.ts.map