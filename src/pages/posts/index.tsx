import styles from "../../styles/posts.module.scss";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import forest from "../../../public/images/forest.jpg";
import moinho from "../../../public/images/moinho.jpg";
import {FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight} from "react-icons/fi";

export default function Posts(){
    return(
        <>
            <Head>
                <title>LEMA Soluções Empresariais - Blog</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <Link className={styles.post} href="/">
                        <Image 
                            src={forest}
                            alt="Post título 1"
                            width={720}
                            height={410}
                            quality={100}
                        />
                        <strong>Uma floresta mais que encantada</strong>
                        <time>3 ABRIL 2023</time>
                        <p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                    </Link>

                    <div className={styles.buttonNavigate}>
                        <div className={styles.buttonsLeft}>
                            <button>
                                <FiChevronsLeft size={25} color="#fff"/>
                            </button>
                            <button>
                                <FiChevronLeft size={25} color="#fff"/>
                            </button>
                        </div>

                        <div className={styles.buttonsRight}>
                            <button>
                                <FiChevronRight size={25} color="#fff"/>
                            </button>
                            <button>
                                <FiChevronsRight size={25} color="#fff"/>
                            </button>
                        </div>
                    </div>
                </div>

            </main>

        </>
    );
}