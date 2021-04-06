import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋🏻 Hey, welcome</span>
          <h1>News about <br />the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>For {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src='/images/avatar.svg' alt='girl codding'/>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IcYNHIRwFGBDc8tZSjZ5gmM');
  const oneHour = 60 * 60;

  const product = {
    priceId: price.id,
    priceCurrency: price.currency,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
    }).format(price.unit_amount / 100),
  };

  return { 
    props: {
      product,
    },
    revalidate: 24 * oneHour,
  }
}