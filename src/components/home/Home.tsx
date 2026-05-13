import { createPortal } from "react-dom";
import ModalManager from "../modalManager/ModalManager";
import styles from "./Home.module.css";
import cheatleLogo from "/cheatleLogo.svg";
import { useModal } from "../../hooks/modal/useModal";

export default function Home() {
    const { openInfoModal } = useModal();
    const puzzleCount = "141";
    const puzzleDate = "11/05/2026";

    return (
        <main className={styles.homeMain}>
            {createPortal(
                <ModalManager />, 
                document.body
            )}
            <div className={styles.content}>
                <div className={styles.headingContainer}>
                    <img src={cheatleLogo} alt="" className={styles.logo} />
                    <h1 className={styles.heading1}>Cheatle</h1>
                    <h2 className={styles.heading2}>Daily Boggle Puzzle</h2>
                </div>
                <p className={styles.heroText}>Spell the 5 highest-scoring words in 10 minutes.</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.finishButton}>Play</button>
                    <button className={styles.cancelButton} onClick={openInfoModal}>How to play</button>
                </div>
            </div>
            <p className={styles.puzzleInfo}>Puzzle #{puzzleCount} • {puzzleDate}</p>
        </main>
    )
}