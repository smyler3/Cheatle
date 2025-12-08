import { useGameData } from "../../hooks/gameData/useGameData";
import { useHints } from "../../hooks/hints/useHints";
import { useModal } from "../../hooks/modal/useModal";
import { useTimer } from "../../hooks/timer/useTimer";
import type { Hint } from "../../schema/CheatleSchema";
import GuessList from "../guessList/GuessList";
import styles from "./ResultModal.module.css";
import closeIcon from "/closeIcon.svg";

export default function ResultModal() {
    const { score, maxPossibleScore } = useGameData();
    const { minutesUsed, secondsUsed } = useTimer();
    const { hintsUsed, topWordHints } = useHints();
    const { closeModal } = useModal();

    return (
        <>
            <button className={styles.closeButton} onClick={closeModal}>
                <img src={closeIcon} alt="" />
            </button>
            <div className={styles.resultModal}>
            <h2 className={styles.modalHeading}>Results</h2>
            <div className={styles.statsContainer}>
                <span className={styles.statContainer}>
                    <div className={styles.stat}>{score} / {maxPossibleScore}</div>
                    <p>Score</p>
                </span>
                <span className={styles.statContainer}>
                    <div className={styles.stat}>
                        {minutesUsed}:{secondsUsed}
                    </div>
                    <p>Time</p>
                </span>
                <span className={styles.statContainer}>
                    <div className={styles.stat}>{hintsUsed}</div>
                    <p>Hints</p>
                </span>
            </div>
            <GuessList shouldShowScore={false} />
            <div className={styles.topWords}>
                <h3>Highest scoring words:</h3>
                {Array.from(topWordHints.entries()).map(([valueStr, words]) => {
                    const value = Number(valueStr);

                    return (
                        <section key={value} className={styles.pointsSection}>
                            <h4>{value} points</h4>
                            <ol className={styles.wordList}>
                                {words.map((hint: Hint, index: number) => {
                                    const wasGuessed = hint.revealedText === hint.text;
                                    return (
                                        <li key={index} className={`${wasGuessed && styles.guessed}`}>
                                            {hint.text}
                                        </li>
                                    )
                                })}
                            </ol>
                        </section>
                    )
                })}
            </div>
            <button 
                className={styles.cancelButton}
                onClick={closeModal}
            >
                Close
            </button>
        </div>
        </>
    );
};