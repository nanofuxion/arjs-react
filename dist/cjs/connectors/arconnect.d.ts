import Arweave from 'arweave';
import Transaction from "arweave/node/lib/transaction";
export declare class Arc {
    transaction: (data: any) => void;
    post: (transaction: Transaction) => void;
    addTag: (transaction: Transaction, name: string, value: string) => void;
    sign: (transaction: Transaction, name: string, value: string) => void;
    submit: (transaction: Transaction) => void;
    arweave: Arweave;
    swc: {
        interactWrite: (arweave: any, wallet: any, contractId: any, input: any) => Promise<string>;
        readContract: (arweave: any, contractId: any) => Promise<any>;
    };
    constructor(key: any, swc: boolean);
}
//# sourceMappingURL=arconnect.d.ts.map