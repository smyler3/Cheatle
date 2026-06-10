import { createPortal } from "react-dom";
import ModalManager from "../modalManager/ModalManager";
import styles from "./Home.module.css";
import cheatleLogo from "/cheatleLogo.svg";
import { useModal } from "../../hooks/modal/useModal";
import { useEffect } from "react";
import { useGameState } from "../../hooks/gameState/useGameState";
import { useScreen } from "../../hooks/setScreen/useScreen";
import { useFetchedData } from "../../hooks/fetchedData/useFetchedData";

export default function Home() {
    const { puzzleCount, puzzleDate } = useFetchedData();
    const { isTimerPaused, isTimerDone, pauseTimer } = useGameState();
    const { openInfoModal } = useModal();
    const { showGameScreen } = useScreen();
    
    const actionButtonCopy = isTimerDone 
    ? "Results" : isTimerPaused ? "Resume" : "Play";

    // Pause the game every time you enter this page
    useEffect(() => {
        pauseTimer();
    }, [pauseTimer]);

    return (
        <main className={styles.homeMain}>
            {createPortal(
                <ModalManager />, 
                document.body
            )}
            <div className={styles.content}>
                <div className={styles.headingContainer}>
                    <img src={cheatleLogo} alt="Cheatle Logo" className={styles.logo} />
                    <h1 className={styles.heading1}>Cheatle</h1>
                    <h2 className={styles.heading2}>Daily Boggle Puzzle</h2>
                </div>
                <p className={styles.heroText}>Spell the 5 highest-scoring words in 10 minutes.</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.actionButton} onClick={showGameScreen}>{actionButtonCopy}</button>
                    <button className={styles.howToPlayButton} onClick={openInfoModal}>How to play</button>
                </div>
            </div>
            <p className={styles.puzzleInfo}>Puzzle #{puzzleCount} • {puzzleDate}</p>
        </main>
    )
}