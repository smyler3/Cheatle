import { createPortal } from "react-dom";
import styles from "./LoadingScreen.module.css";
import ModalManager from "../modalManager/ModalManager";

const LoadingScreen = () => {
    return (
        <main className={styles.loadingMain}>
            {createPortal(
                <ModalManager />, 
                document.body
            )}
            <div className={styles.loadingContainer} >
                <h2>Loading</h2>
                <span 
                    className={styles.loadingDot}
                    style={{
                        animationDelay: `0s`,
                    }}
                >.</span>
                <span 
                    className={styles.loadingDot}
                    style={{
                        animationDelay: `0.1s`,
                    }}
                >.</span>
                <span 
                    className={styles.loadingDot}
                    style={{
                        animationDelay: `0.2s`,
                    }}
                >.</span>
            </div>
        </main>
    );
};

export default LoadingScreen;