import { useModal } from "../../hooks/modal/useModal";
import { useScreen } from "../../hooks/setScreen/useScreen";
import styles from "./Header.module.css"
import infoIcon from "/infoIcon.svg";

const Header = () => {
    const { openInfoModal } = useModal();
    const { showHomeScreen } = useScreen();

    return (
        <header
            className={styles.header}
        >
            <div
                className={styles.contentContainer}
            >
                <button onClick={showHomeScreen}>
                    <h1
                        className={styles.title}
                    >
                        Cheatle
                    </h1>
                </button>
                <button
                    className={styles.button}
                    onClick={openInfoModal}
                >
                    <img
                        src={infoIcon}
                        alt="Info Icon"
                        className={styles.icon}
                    />
                </button>
            </div>
        </header>
    )
};

export default Header;