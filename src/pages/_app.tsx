import type { AppProps } from 'next/app';
import "../styles/global.scss";
import Header from "../components/Header";
import { PrismicProvider } from '@prismicio/react';
import { client } from "../services/prismic";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PrismicProvider client={client}>
        <Header />
        <Component {...pageProps} />
      </PrismicProvider>
    </>
  );
}
