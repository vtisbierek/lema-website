import styles from "../styles/header.module.scss";
import Image from "next/image";
import logo from "../../public/images/lema_logo_pínk_sq.jpg";
import ActiveLink from "./ActiveLink";
import Link from "next/link";

export default function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <Image src={logo} alt="LEMA Logo"/>
                </Link>
                <nav>
                    <ActiveLink href="/" >
                        Home
                    </ActiveLink>
                    <ActiveLink href="/posts" >
                        Conteúdos
                    </ActiveLink>
                    <ActiveLink href="/sobre" >
                        Quem somos?
                    </ActiveLink>
                </nav>
                <a className={styles.headerReadyBtn} type="button" href="https://www.google.com/">COMEÇAR</a>
            </div>
        </header>
    );
}