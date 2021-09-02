/// <reference types="react" />
import { connectors as arConnector } from './connectors/index';
import { Wallet, Props } from './types';
export declare function useArjs(): Wallet;
export { arConnector as connectors };
export declare function ArjsProvider({ connectors, enableSWC, pollingRate, gateway, children }: Props): JSX.Element;
//# sourceMappingURL=index.d.ts.map