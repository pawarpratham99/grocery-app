import Head from 'next/head';
import HeroBanner from '../components/HeroBanner';

export default function Home() {
  return (
    <>
      <Head>
        <title>FreshCart - 10 Min Grocery Delivery</title>
      </Head>
      <HeroBanner />
    </>
  );
}