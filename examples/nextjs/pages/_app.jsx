import React from 'react';
import 'tailwindcss/tailwind.css'
import { ArjsProvider } from 'arjs-react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ArjsProvider gateway={{
        host: "dh48zl0solow5.cloudfront.net",
        port: 443,
        protocol: "https",
        timeout: 20000,
        logging: false,
      }} connectors={{ arconnect: true, arweave: true }} enableSWC={true}>
        <Component {...pageProps} />
      </ArjsProvider>
    </>
  )
}

export default MyApp
