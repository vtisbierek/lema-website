import Link, {LinkProps} from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/header.module.scss";

interface ActiveLinkProps extends LinkProps{
    children: string;
}

export default function ActiveLink({children, ...rest}: ActiveLinkProps){
    const {asPath} = useRouter();
    const className = asPath === rest.href ? styles.active : "";

    return(
        <Link {...rest} className={className}>
            {children}
        </Link>
    );
}