import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer
            className={styles.footer}
        >
            <a
                href="https://www.talymmyler.com/"
                rel="noopener noreferrer"
                target="_blank"
                className={styles.link}
            >
                Talym Myler
            </a>
        </footer>
    )
};

export default Footer;