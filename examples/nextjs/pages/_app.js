import React from 'react';
// import '../styles/globals.css'
import { ArjsProvider } from 'arjs-react'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <ArjsProvider connectors={{arconnect: true, arweave: true}} enableSWC={true}>
      <Component {...pageProps} />
    </ArjsProvider>
    </>
  )
}

export default MyApp



// import React, { useState, useEffect, useMemo } from 'react'
// import { ArjsProvider, useArjs } from 'arjs-react'

// function _App() {
//       const  wallet  = useArjs();
//       const permission = { permissions: ["SIGN_TRANSACTION"] }
//       const [key, setKey] = useState('')

//   const activate = (connector, key) => wallet.connect(connector, key)
//     const getKey = (e) =>{ setKey(e.target.value)}

//     const [balance, setBalance] = useState("Requesting...");
//     const [address, setAddress] = useState("Requesting...");

//     useEffect(() => {
//       if(wallet.status == "connected")(async () => {
//       console.log(wallet)
//       setBalance(wallet.getArweave().ar.winstonToAr( await wallet.getBalance("self")))
//       setAddress(await wallet.getAddress())
//       })()
//     }, [wallet])

//     return(
//     <>
//       <h1>Wallet</h1>
//       {wallet.status == "connected" ? (
//         <div>
//           <div>Account: {address}</div>
//           <div>Balance: {balance}</div>
//           <button onClick={() => wallet.disconnect()}>disconnect</button>
//         </div>
//       ) : (
//         <div>
//           Connect:
//           <button onClick={() => activate('arweave', key)}>Arweave (with Key)</button>
//           <input type="text" value={key} placeholder={'key here'} onChange={getKey}/>
//           <button onClick={() => activate('arconnect', permission)}>ArConnect</button>
//         </div>
//       )}
//     </>
//     )}

//     //wrap the root component with <ArjsProvider />
//     function App(){
//       return (

//         <ArjsProvider 
//             //Add wallets here
//             connectors={{
//                 arconnect: {},
//                 arweave: {}
//             }} 
//             //enable/disable smartweave contract interaction here
//             enableSWC={true}> 
//         <_App />
//         </ArjsProvider>
//     )}

// export default App 