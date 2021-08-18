import { JWKInterface } from 'arweave/node/lib/wallet';
import Arweave from 'arweave';
export declare const interactWrite: (arweave: Arweave, wallet: "use_wallet" | JWKInterface, contractId: string, input: string) => Promise<string>;
export declare const interactRead: (arweave: Arweave, wallet: "use_wallet" | JWKInterface | undefined, contractId: string, input: string) => Promise<any>;
export declare const readContract: (arweave: Arweave, contractId: string) => Promise<any>;
//# sourceMappingURL=smartweave.d.ts.map