import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
// import styles from "../styles/Home.module.css";
import { useArjs } from 'arjs-react';
import { readFile } from "../src/readFile";

export default function Home() {
  const [key, setKey] = useState(""),
    [cinput, setCinput] = useState(""),
    [swinput, setSWinput] = useState(""),
    [rinput, setRinput] = useState(""),
    [cstate, setCstate] = useState("");

  const wallet = useArjs();
  const activate = (connector, key) => wallet.connect(connector, key)

  const [balance, setBalance] = useState("Requesting...");
  const [address, setAddress] = useState("Requesting...");

  useEffect(() => {
    if (wallet.status == "connected") (async () => {
      console.log(wallet)
      setBalance(wallet.getArweave().ar.winstonToAr(await wallet.getBalance("self")))
      setAddress(await wallet.getAddress())
    })()
  }, [wallet])

  useEffect(() => {
    console.log(cstate)
  },[cstate])

  async function getKey(e) {
    let file = e.target.files[0], res;
    await readFile(file).then(result => res = result)
    setKey(res)
  }

  function getCinput(e) {
    setCinput(e.target.value)
  }
  function getRinput(e) {
    setRinput(e.target.value)
  }
  function getSWinput(e) {
    setSWinput(e.target.value)
  }

  return (
    <div className='container mx-auto pt-8'>
      <Head>
        <title>Context-api with TypeScript and nextJS</title>
        <meta charSet={"UTF-8"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>
      <main className='bg-gray-600 rounded-3xl p-8 text-white max-w-xl mx-auto'>
        <div>
          <h1 className='font-bold text-3xl mb-5'>arjs-react + next.js Example</h1>
          <div>
            <div className='grid grid-cols-3 pb-5'>

              <h2 className='font-bold col-span-3 bg-gray-600'>Status: {(wallet.status == 'connected') ? <span className="text-green-500 fas fa-circle"></span> : <span className="text-red-500 fas fa-times"></span>}</h2>
              <h2 className='font-bold col-span-3 bg-gray-600'>Connected Wallet: {(wallet.provider != 'disconnected')?wallet.provider: 'none'}</h2>
            </div>

            <div className='grid grid-cols-3 gap-2 pb-5'>
              <label className='font-bold col-span-3'>
                Wallet Key:
              </label>
              <input
                className='rounded-lg px-2 border-2 bg-gray-300 border-gray-900 text-black col-span-2'
                type="file"
                onChange={getKey}
              />
              <button className={((wallet.status == 'connected')?
                'disabled:bg-gray-700 text-gray-500 rounded-lg px-4 border-2 border-gray-500':
                'bg-gray-300 text-black rounded-lg px-4 border-2 border-gray-900')}
                disabled={(wallet.status == 'connected')}
                onClick={async () => activate('arweave', key)}>
                Arweave
              </button>
              <p className='font-bold col-span-3 mx-auto'> or </p>
              <button className={((wallet.status == 'connected')?
                'disabled:bg-gray-700 text-gray-500 rounded-lg px-4 border-2 border-gray-500 col-span-3':
                'bg-gray-300 text-black rounded-lg px-4 border-2 border-gray-900 col-span-3')}
                disabled={(wallet.status == 'connected')}
                onClick={() => activate('arconnect', { permissions: ["SIGN_TRANSACTION"] })}>
                ArConnect
              </button>
              <button className='bg-gray-300 text-black rounded-lg px-4 border-2 border-gray-900 col-span-3'
                onClick={() => wallet.disconnect()}>
                Disconnect
              </button>
            </div>
            <div className='grid grid-cols-3 gap-2 pb-5'>
              <label className='font-bold md:col-span-3 col-span-1 '>
                SW Contract ID:
              </label>
              <input
                className='rounded-lg max-h-8 md:place-self-auto place-self-end text-black px-2 border-2 border-gray-900 col-span-2'
                type="text"
                value={cinput}
                onChange={getCinput}
              />
              <button className='bg-gray-300 text-black rounded-lg px-4 border-2 border-gray-900 col-span-1'
                onClick={async () => setCstate(await wallet.smartweave.read(cinput))}>
                Read Contract
              </button>
            </div>
            <div className='grid grid-cols-3 grid-rows-2 gap-2 pb-5'>
              <label className='font-bold col-span-3 '>
                Contract Input:
              </label>
              <input
                className='rounded-lg max-h-8 text-black px-2 border-2 border-gray-900 col-span-2 row-span-2'
                type="text"
                value={rinput}
                placeholder={'recipient wallet address'}
                onChange={getRinput}
              />
              <button className='bg-gray-300 text-black rounded-lg px-4 border-2 border-gray-900 col-span-1 row-span-4'
                onClick={async () => setCstate(await wallet.smartweave.write(swinput, rinput))}>
                Submit SW Transaction
              </button>
              <input
                className='rounded-lg max-h-8 text-black px-2 border-2 border-gray-900 col-span-2 row-span-2'
                type="text"
                value={swinput}
                placeholder={'contract input JSON'}
                onChange={getSWinput}
              />
            </div>
            <pre className='col-span-3 mx-auto pt-8 rounded lg bg-gray-900 overflow-scroll h-full w-full max-h-48 max-w-2xl'>{JSON.stringify(cstate, null, 2)}</pre>
          </div>
        </div>
      </main>
    </div>
  );
}