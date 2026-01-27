import { useModal } from "../../hooks/modal/useModal";
import styles from "./Header.module.css"
import infoIcon from "/infoIcon.svg";

const Header = () => {
    const { openInfoModal } = useModal();
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
                    onClick={openInfoModal}
                >
                    <img
                        src={infoIcon}
                        alt=""
                        className={styles.icon}
                    />
                </button>
            </div>
        </header>
    )
};

export default Header;