import Head from "next/head";
import Amount from "../components/amount";
import { INGREDIENTS } from "../lib/ingredients";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ingredient Weight Calculator</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <main className={styles.main}>
        <h1>Ingredient Weight Calculator</h1>
        <Amount ingredients={INGREDIENTS} />
      </main>
    </div>
  );
}
