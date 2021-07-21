import Arweave from 'arweave';
import Transaction from "arweave/web/lib/transaction";
export declare function Arjs(key: any, swc: any): Promise<{
    transaction: (data: any, _key?: any) => any;
    post: (transaction: Transaction) => any;
    addTag: (transaction: Transaction, name: string, value: string) => void;
    sign: (transaction: Transaction, _key?: any) => Promise<void>;
    submit: (transaction: Transaction) => any;
    smartweave: {
        write: (input: any, id: string, _key?: any) => Promise<string>;
        read: (id: string) => Promise<any>;
    };
    getArweave: () => Arweave;
}>;
//# sourceMappingURL=arweave-js.d.ts.map