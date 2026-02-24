import Head from 'next/head';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';

export default function Home() {
  return (
    <>
      <Head>
        <title>FreshCart - 10 Min Grocery Delivery</title>
      </Head>
      <Header />
      <main>
        <HeroBanner />
      </main>
    </>
  );
}