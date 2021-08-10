import React from 'react';
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
