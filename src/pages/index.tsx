import Head from 'next/head';
import styles from "../styles/homePage.module.scss";
import Image from 'next/image';
import footerImg from "../../public/images/footerImage.png";
import { GetStaticProps } from 'next';
import {client} from "../services/prismic";
import * as prismicH from '@prismicio/helpers';

type Content = {
  title: string;
  subTitle: string;
  linkAction: string;
  titleImage: string;
  titleSection1: string;
  subtitleSection1: string;
  imageSection1: string;
  titleSection2: string;
  subtitleSection2: string;
  imageSection2: string;
}

interface ContentProps{
  content: Content;
}

export default function Home({content}: ContentProps) { 

  return (
    <>
      <Head>
        <title>LEMA Soluções Empresariais</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerDiv}>
          <section className={styles.containerSection}>
            <h1>{content.title}</h1>
            <span>{content.subTitle}</span>
            <a href={content.linkAction} target="_blank">
              <button>COMEÇAR</button>
            </a>
          </section>
          <img src={content.titleImage} alt="home image 1" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.secondSection}>
          <section>
            <h2>{content.titleSection1}</h2>
            <span>{content.subtitleSection1}</span>
          </section>
          <img src={content.imageSection1} alt="home image 2" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.thirdSection}>
          <img src={content.imageSection2} alt="home image 3" />
          <section>
            <h2>{content.titleSection2}</h2>
            <span>{content.subtitleSection2}</span>
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

        <a className={styles.whatsapp} href="https://wa.me/5551996830900" target="_blank">
          <img className={styles.whatsappIcon} src="./images/whatsapp_icon.png" alt="whatsapp icon"/>
        </a>
        
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.getSingle("home");

  const {
    title, sub_title, link_action, image_title, title_section_1, sub_title_section_1, image_section_1, title_section_2, sub_title_section_2, image_section_2
  } = response.data;
  
  const content = {
    title: title,
    subTitle: prismicH.asText(sub_title),
    linkAction: prismicH.asLink(link_action),
    titleImage: prismicH.asImageSrc(image_title),
    titleSection1: title_section_1,
    subtitleSection1: prismicH.asText(sub_title_section_1),
    imageSection1: prismicH.asImageSrc(image_section_1),
    titleSection2: title_section_2,
    subtitleSection2: prismicH.asText(sub_title_section_2),
    imageSection2: prismicH.asImageSrc(image_section_2),
  }
   
  return {
    props: {
      content
    },
    revalidate: 60 * 10, //essa página será gerada novamente a cada 10 minutos
  }
}
