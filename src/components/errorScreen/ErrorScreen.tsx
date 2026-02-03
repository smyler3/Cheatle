import { createPortal } from "react-dom";
import styles from "./ErrorScreen.module.css";
import ModalManager from "../modalManager/ModalManager";

const ErrorScreen = () => {
    return (
        <main className={styles.errorMain}>
            {createPortal(
                <ModalManager />, 
                document.body
            )}
            <div>Something went wrong</div>
        </main>
    );
};

export default ErrorScreen;