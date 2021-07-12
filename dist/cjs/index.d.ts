import { ReactNode } from "react";
import { connectors as arConnector } from './connectors/index';
declare type WalletContext = {
    launch: () => void;
    enabled: {
        enabled: any[];
        enableSWC: boolean;
    };
    wallet: any;
} | null;
export declare function useArjs(): WalletContext;
declare type Props = {
    connectors: object;
    enableSWC: boolean;
    children: ReactNode;
};
export { arConnector as connectors };
export declare function ArjsProvider({ connectors, enableSWC, children }: Props): JSX.Element;
//# sourceMappingURL=index.d.ts.map