import { useModal } from "../../hooks/modal/useModal";
import type { Guess } from "../../types/types";
import GuessList from "../guessList/GuessList";
import styles from "./ResultsModal.module.css";

type ResultsModalProps = {
    score: number,
    maxPossibleScore: number,
    timeUsed: string,
    hintsUsed: number,
    guesses: Guess[],
    // highestScoringWords: Word[],
}

export default function ResultsModal({
    score = 46,
    maxPossibleScore = 54,
    timeUsed = "10:00",
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
}: ResultsModalProps) {
    const { closeModal } = useModal();
    const topGuesses = guesses.slice(0, 5);

    return (
        <div className={styles.resultsModal}>
            <h2 className={styles.modalHeading}>Results</h2>
            <div className={styles.statsContainer}>
                <span className={styles.statContainer}>
                    <div className={styles.stat}>{score} / {maxPossibleScore}</div>
                    <p>Score</p>
                </span>
                <span className={styles.statContainer}>
                    <div className={styles.stat}>{timeUsed}</div>
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
                className={styles.closeButton}
                onClick={closeModal}
            >
                Close
            </button>
        </div>
    )
};