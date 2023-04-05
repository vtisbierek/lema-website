import styles from "../../styles/sobre.module.scss";
import { GetStaticProps } from 'next';
import {client} from "../../services/prismic";
import * as prismicH from '@prismicio/helpers';
import Head from "next/head";
import {FaInstagram, FaLinkedin, FaWhatsapp} from "react-icons/fa";

interface SobreProps{
    aboutContent: {
        title: string;
        content: string;
        image: string;
        instagram: string;
        linkedin: string;
        whatsapp: string; 
    }   
}

export default function Sobre({aboutContent}: SobreProps){

    return (
        <>
            <Head>
                <title>Sobre Nós | LEMA Soluções Empresariais</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.containerDiv}>
                    <section className={styles.containerSection}>
                        <h1>{aboutContent.title}</h1>
                        <p>{aboutContent.content}</p>
                        <a href={aboutContent.instagram} target="_blank">
                            <FaInstagram size={40} />
                        </a>
                        <a href={aboutContent.linkedin} target="_blank">
                            <FaLinkedin size={40} />
                        </a>
                        <a href={aboutContent.whatsapp} target="_blank">
                            <FaWhatsapp size={40} />
                        </a>
                    </section>
                    <img src={aboutContent.image} alt={aboutContent.title} />
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await client.getSingle("about");
  
    const {
      title, content, image, instagram, linkedin, whatsapp
    } = response.data;
    
    const aboutContent = {
      title: title,
      content: prismicH.asText(content),
      image: prismicH.asImageSrc(image),
      instagram: prismicH.asLink(instagram),
      linkedin: prismicH.asLink(linkedin),
      whatsapp: prismicH.asLink(whatsapp),
    }

    return {
      props: {
        aboutContent
      },
      revalidate: 60 * 10, //essa página será gerada novamente a cada 10 minutos
    }
  }