import { JWKInterface } from 'arweave/node/lib/wallet';
export declare const interactWrite: (arweave: import("arweave"), wallet: "use_wallet" | JWKInterface, contractId: string, input: string) => Promise<string>;
export declare const interactRead: (arweave: import("arweave"), wallet: "use_wallet" | JWKInterface | undefined, contractId: string, input: string) => Promise<any>;
export declare const readContract: (arweave: import("arweave"), contractId: string) => Promise<any>;
//# sourceMappingURL=smartweave.d.ts.map