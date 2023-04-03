import styles from "../../styles/posts.module.scss";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight} from "react-icons/fi";
import { GetStaticProps } from 'next';
import {client} from "../../services/prismic";
import * as prismicH from '@prismicio/helpers';
import {useState} from "react";

type Post = {
    postId: string;
    title: string;
    image: string;
    postContent: string;
    updatedAt: string;
}

interface PostsProps{
    posts: Post[];
    page: number; 
    totalPages: number;
}

export default function Posts({posts: postsBlog, page, totalPages}: PostsProps){
    const [posts, setPosts] = useState(postsBlog || []);
    const [currentPage, setCurrentPage] = useState(page);

    console.log(page, totalPages);
    

    return(
        <>
            <Head>
                <title>LEMA Soluções Empresariais - Blog</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>

                    {posts.map(post => (
                        <Link className={styles.post} href={`/posts/${post.postId}`} key={post.postId}>
                            <Image 
                                src={post.image}
                                alt={post.title}
                                width={720}
                                height={410}
                                quality={100}
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk2Pr/GAAE7QJ8/KvC+QAAAABJRU5ErkJggg=="
                            />
                            <strong>{post.title}</strong>
                            <time>{post.updatedAt}</time>
                            <p>{post.postContent}</p>
                        </Link>
                    ))}
                    

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

export const getStaticProps: GetStaticProps = async () => {
    const prismic = await client.getByType("post", {
        orderings: {
            field: 'document.last_publication_date',
            direction: 'desc',
        },
        pageSize: 2,
    });

    const posts = prismic.results.map(item => {
        return {
            postId: item.uid,
            title: item.data.title,
            image: prismicH.asImageSrc(item.data.cover_image),
            postContent: prismicH.asText(item.data.post_content),
            updatedAt: new Date(item.last_publication_date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            })
        }
    });

    //console.log(prismic);
    
    
    return {
        props: {
            posts,
            page: prismic.page,
            totalPages: prismic.total_pages
        },
        revalidate: 600,
    }
}