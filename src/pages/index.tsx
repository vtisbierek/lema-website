import Head from 'next/head';
import styles from "../styles/homePage.module.scss";
import Image from 'next/image';
import footerImg from "../../public/images/footerImage.jpeg";

export default function Home() {
  return (
    <>
      <Head>
        <title>LEMA Soluções Empresariais</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerDiv}>
          <section className={styles.containerSection}>
            <h1>Lorem ipsum dolor sit amet</h1>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </span>
            <a>
              <button>Lorem</button>
            </a>
          </section>
          <img src="/images/banner.png" alt="home image 1" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.secondSection}>
          <section>
            <h2>Duis aute irure dolor in reprehenderit in voluptate velit</h2>
            <span>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
          </section>
          <img src="/images/banner2.jpeg" alt="home image 2" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.thirdSection}>
          <img src="/images/banner3.jpeg" alt="home image 3" />
          <section>
            <h2>Duis aute irure dolor in reprehenderit in voluptate velit</h2>
            <span>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
          </section>
        </div>

        <div className={styles.homeFooter}>
          <Image src={footerImg} alt="footer image" width={300}/>
          <h2>Mais de <span className={styles.sucessCases}>100</span> empresas já evoluíram ao próximo nível com a Lema</h2>
          <span>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
          <a>
            <button>COMEÇAR AGORA</button>
          </a>
        </div>
      </main>
    </>
  )
}
