import { useModal } from "../../hooks/modal/useModal";
import { useTimer } from "../../hooks/timer/useTimer";
import type { Guess } from "../../types/types";
import GuessList from "../guessList/GuessList";
import styles from "./ResultModal.module.css";
import closeIcon from "/closeIcon.svg";

type ResultModalProps = {
    score: number,
    maxPossibleScore: number,
    hintsUsed: number,
    guesses: Guess[],
    // highestScoringWords: Word[],
}

export default function ResultModal({
    score = 46,
    maxPossibleScore = 54,
    hintsUsed = 4,
    guesses = [
        { value: 12, text: "WORD", isTopWord: true },
        { value: 12, text: "WORD", isTopWord: true },
        { value: 12, text: "WORD", isTopWord: true },
        { value: 12, text: "WORD", isTopWord: false },
        { value: 12, text: "WORD", isTopWord: false },
        { value: 12, text: "WORD", isTopWord: false },
    ],
    // highestScoringWords = [],
}: ResultModalProps) {
    const { minutesUsed, secondsUsed } = useTimer();
    const { closeModal } = useModal();

    const topGuesses = guesses.slice(0, 5);

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
            <GuessList guesses={topGuesses} />
            <div className={styles.highestScoringWords}>
                <h3>Highest scoring words:</h3>
                <section className={styles.pointsSection}>
                    <h4>13 points</h4>
                    <ol className={styles.wordList}>
                        <li className={styles.guessed}>Theorms</li>
                    </ol>
                </section>
                <section className={styles.pointsSection}>
                    <h4>12 points</h4>
                    <ol className={styles.wordList}>
                        <li>Theorm</li>
                        <li className={styles.guessed}>Methane</li>
                        <li className={styles.guessed}>Telegrams</li>
                    </ol>
                </section>
                <section className={styles.pointsSection}>
                    <h4>10 points</h4>
                    <ol className={styles.wordList}>
                        <li>Helmer</li>
                        <li>Smeeth</li>
                        <li>Telegram</li>
                    </ol>
                </section>
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