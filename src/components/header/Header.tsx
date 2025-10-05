import styles from "./Header.module.css"

const Header = () => {
    return (
        <header
            className={styles.header}
        >
            <div
                className={styles.contentContainer}
            >
                <h1
                    className={styles.title}
                >
                    Cheatle
                </h1>
                <button
                    className={styles.button}
                >
                    <img
                        src="/infoIcon.svg"
                        alt=""
                        className={styles.icon}
                    />
                </button>
            </div>
        </header>
    )
};

export default Header;