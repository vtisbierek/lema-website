import styles from "../../styles/post.module.scss";
import {GetServerSideProps} from "next";
import {client} from "../../services/prismic";
import * as prismicH from '@prismicio/helpers';
import Head from "next/head";
import Image from "next/image"; 

type Post = {
    postId: string;
    title: string;
    image: string;
    postContent: string;
    updatedAt: string;
}

interface PostProps{
    post: Post;
}

export default function Post({post}: PostProps){
    console.log(post);
    
    return (
        <>
            <Head>
                <title>{post.title.substring(0, 10)}... | Blog | LEMA</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={720}
                        height={410}
                        quality={100}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk2Pr/GAAE7QJ8/KvC+QAAAABJRU5ErkJggg=="
                    />

                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.postContent}}></div> {/*esse div com essa propriedade dangerouslySetInnerHTML me permite injetar o html do conteúdo do post diretamente dentro dela*/}
                </article>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({query}) => { //query é um atributo do objeto context que está definido na tipagem do GetServerSideProps, aqui eu estou apenas descontruindo o objeto para acessar ele diretamente, sem precisar digitar context.query
    const {postId} = query; //da mesma forma, aqui estou desconstruindo o objeto query pra pegar só o valor dele

    try{
        const response = await client.getByUID("post", postId as string);

        return {
            props: {
                post: {
                    postId: response.uid,
                    title: response.data.title,
                    image: prismicH.asImageSrc(response.data.cover_image),
                    postContent: prismicH.asHTML(response.data.post_content), //agora eu vou passar o conteúdo como HTML e não como texto, para que o conteúdo seja exibido com toda a formatação certa
                    updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    })
                }
            }
        }
    }catch{ //se o cara digitar o url do post errado e tentar buscar um post que não existe, retorna erro e cai aqui
        return {
            redirect: {
                destination: "/posts",
                permanent: false,
            }
        }
    }
}