# arjs-react
An Arweave.js dapp wallet aggregator for react. (similar to useWallet but for Arweave.) 

## Todos:
* Implement persistent sessions with [`"sesssionUtils/sessionStorage.ts"`](https://github.com/nanofuxion/arjs-react/blob/main/src/sesssionUtils/sessionStorage.ts)

## Usage: 
Add it to your project:

```console
yarn add arjs-react 
```


Use it in your React app:

```jsx
//App.js

import React, { useState, useEffect, useMemo } from 'react'
import { ArjsProvider, useArjs } from 'arjs-react'

function _App() {
      const  wallet  = useArjs();
      const permission = { permissions: ["SIGN_TRANSACTION"] }
      const [key, setKey] = useState('')

  const activate = (connector, key) => wallet.connect(connector, key)
    const getKey = (e) =>{ setKey(e.target.value)}

    const [balance, setBalance] = useState("Requesting...");
    const [address, setAddress] = useState("Requesting...");

    wallet.ready(() => {
      if(wallet.status == "connected")(async () => {
      console.log(wallet)
      setBalance(wallet.getArweave().ar.winstonToAr( await wallet.getBalance("self")))
      setAddress(await wallet.getAddress())
      })()
    })

    return(
    <>
      <h1>Wallet</h1>
      {wallet.status == "connected" ? (
        <div>
          <div>Account: {address}</div>
          <div>Balance: {balance}</div>
          <button onClick={() => wallet.disconnect()}>disconnect</button>
        </div>
      ) : (
        <div>
          Connect:
          <button onClick={() => activate('arweave', key)}>Arweave (with Key)</button>
          <input type="text" value={key} placeholder={'key here'} onChange={getKey}/>
          <button onClick={() => activate('arconnect', permission)}>ArConnect</button>
        </div>
      )}
    </>
    )}

    //wrap the root component with <ArjsProvider />
    function App(){
      return (

        <ArjsProvider 
            //Add wallets here
            connectors={{
                arconnect: true,
                arweave: true
            }} 
            //enable/disable smartweave contract interaction here
            enableSWC={false}> 
        <_App />
        </ArjsProvider>
    )}

export default App 
```


## API

### &lt;ArjsProvider />

This is the provider component. It should be placed above any component using `useArjs()`. Apart from `children`, it accepts two other props:


#### enableSWC

Enables smartweave transactions in `wallet.arweave.smartweave`. 
Defaults to `false`.


#### connectors

Configuration for the different connectors. accepts a `key:` dapp wallet name with a truthy `value`, may accept wallet configurations when new wallets are added.
- `arweave`: `{}`
- `arconnect`: `{}`


### useArjs()

This is the hook to be used throughout the app. 
It returns an object representing the connected account (“wallet”), containing:

- `connect(connectorId, arg)`: Call this function with a connector ID to “connect” to a provider (see above for the connectors provided by default) and an `arg` which can either be the `arconnect` permissions to request or the wallet `key` to initialize "Arweave.js".
- `ready(callback)` : Runs a function once a wallet is selected and the wallet has completed loading it's dependencies. `useCallback` with `[arweave, status]` as dependents.
- `connector`: The "key" of the wallet you're connected to (e.g "arweave", "arconnect").
- `connectors`: The full list of connectors.
- `disconnect()`: Call this function to “disconnect” from the current provider. This will this will not disconnect `arconnect` to disconnect from `arconnect` use `arweave.disconnect()` in the `wallet` object.
- `status`: Contains the current status of the wallet connection. The possible values are:
  - "disconnected": no wallet connected (default state).
  - "connecting": trying to connect to the wallet.
  - "connected": connected to the wallet (i.e. the account is available).
  - "failed": a connection error happened.
- All the children of `arweave` shown below except `disconnect` are available directly in the `wallet` object
- `arweave`: 
- `isloading`: Integer that increases when `smartweave.write` `smartweave.read` `smartweave.iread` `wallet.sign` and decreases once the functions completes execution.
- `loadStatus("add" | "sub")`:  `loadStatus("add")` increments `isloading` by one, `loadStatus("sub")` decrements `isloading` by one.
    - `transaction(data):` returns `arweave.createTransaction(data)`
    - `post(transaction):` returns `arweave.transactions.post(transaction)`
    - `addTag(transaction, name, value):` returns `transaction.addTag(name, value)`
    - `sign(transaction):` returns `arweave.transactions.getUploader(transaction)`
    - `smartweave:` returns:
      - `write(input, id)` executes  `interactWrite(arweave, wallet, id, input)`
      - `read(id)` executes  `readContract(arweave, id)`
      - `iread(id)` executes `interactRead(arweave, wallet, id, input)` 
      - [click here](https://github.com/ArweaveTeam/SmartWeave/blob/master/SDK.md) for Smartweave SDK readme.
    - `getArweave`: returns "the `Arweave.js object` provided by the connected wallet."
    - `disconnect`: returns `window.arweaveWallet.disconnect()` only available when connected with ArConnect.
    - `getBalance`: returns `"current wallet balance in winston as string"`
    - `getAddress`: returns `"current wallet address as string"`

## Bonus 🍬

Added smartweave `interactRead` support for ArConnect.

## Examples

To run the examples, switch to the respective directories. Then, simply run `yarn dev`.

## Special thanks

arjs-react is a greatly inspired by [useWallet()](https://github.com/aragon/use-wallet) and it's file structure.