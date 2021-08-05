import { ArjsContext, useArweave } from 'arjs-react'
import React from 'react'

export const Connect = () => {
    const enabledWallets = React.useContext(ArjsContext)
    const activate = (connector, persist) => useArweave(enabledWallets, connector, persist)

    return (
        <div>
            <button onClick={
                () => activate('arconnect', false)
            }>
            </button>
        </div>
    )
}