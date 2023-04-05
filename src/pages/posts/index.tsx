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

export default function Posts({posts: postsBlog, page, totalPages}: PostsProps){ //renomeei o props posts como postsBlog para poder dar o nome de posts pra minha variável de estado, senão daria problema ter os dois nomes iguais
    const [posts, setPosts] = useState(postsBlog || []);
    const [currentPage, setCurrentPage] = useState(page);

    async function getPosts(pageNumber: number){
        const response = await client.getByType("post", {
            orderings: {
                field: 'document.last_publication_date',
                direction: 'desc',
            },
            pageSize: 2,
            page: pageNumber,
        });  

        return response;
    }

    async function navigatePage(pageNumber: number){
        if (pageNumber < 1 || pageNumber > totalPages) return;

        const response = await getPosts(pageNumber);

        if (response.results.length === 0) return;

        const newPosts = response.results.map(item => {
            return {
                postId: item.uid,
                title: item.data.title as string,
                image: prismicH.asImageSrc(item.data.cover_image) as string,
                postContent: prismicH.asText(item.data.post_content),
                updatedAt: new Date(item.last_publication_date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                })
            }
        });

        setCurrentPage(pageNumber);
        setPosts(newPosts);
    }
    

    return(
        <>
            <Head>
                <title>Blog | LEMA Soluções Empresariais</title>
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
                            {post.postContent.length < 200 ? (
                                <p>{post.postContent}</p>
                            ) : (
                                //<p>{post.postContent.substring(0, 200)}... <span>Ler Mais</span></p> aqui seria para fazer com contagem de caracteres
                                <p>{post.postContent.split(".")[0]}... <span>Ler Mais</span></p> //aqui eu tô truncando no primeiro ponto (fim do primeiro parágrafo)
                            )}
                            
                        </Link>
                    ))}

                    <div className={styles.buttonNavigate}>
                        <div className={styles.buttonsLeft}>
                            <button disabled={currentPage < 2} onClick={() => {navigatePage(1)}}>
                                <FiChevronsLeft size={25} color="#fff"/>
                            </button>
                            <button disabled={currentPage < 2} onClick={() => {navigatePage(currentPage - 1)}}>
                                <FiChevronLeft size={25} color="#fff"/>
                            </button>
                        </div>

                        <span>{currentPage}</span>

                        <div className={styles.buttonsRight}>
                            <button disabled={currentPage >= totalPages} onClick={() => {navigatePage(currentPage + 1)}}>
                                <FiChevronRight size={25} color="#fff"/>
                            </button>
                            <button disabled={currentPage >= totalPages} onClick={() => {navigatePage(totalPages)}}>
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
    const response = await client.getByType("post", {
        orderings: {
            field: 'document.last_publication_date',
            direction: 'desc',
        },
        pageSize: 2,
    });

    console.log(response);

    const posts = response.results.map(item => {
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

    return {
        props: {
            posts,
            page: response.page,
            totalPages: response.total_pages
        },
        revalidate: 60 * 10,
    }
}