import Transaction from "arweave/node/lib/transaction";
export declare function Arjs(key: any, swc: any): {
    transaction: (data: any) => any;
    post: (transaction: Transaction) => any;
    addTag: (transaction: Transaction, name: string, value: string) => void;
    sign: (transaction: Transaction) => Promise<void>;
    submit: (transaction: Transaction) => any;
    smartweave: {
        write: (input: any, id: string) => Promise<string>;
        read: (id: any) => Promise<any>;
    };
};
//# sourceMappingURL=arweave-js.d.ts.map