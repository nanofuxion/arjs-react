import { ReactNode } from "react";
import { connectors as arConnectors } from './connectors/index';
declare type WalletContext = {
    launch: () => void;
    enabled: Array<any>;
    swc: boolean;
} | null;
export declare function useArjs(): WalletContext;
declare type Props = {
    connectors: object;
    enableSWC: boolean;
    children: ReactNode;
};
export { arConnectors as connectors };
export declare function ArjsProvider({ connectors, enableSWC, children }: Props): JSX.Element;
//# sourceMappingURL=index.d.ts.map