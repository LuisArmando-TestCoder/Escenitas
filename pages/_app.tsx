import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Partytown } from '@builder.io/partytown/react'
import {
    RecoilRoot,
} from 'recoil'
import RecoilOutside from 'recoil-outside'

import '../styles/main.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <RecoilOutside />
        <Head>
          <Partytown debug={true} forward={['dataLayer.push']} />
        </Head>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  )
}

export default MyApp
