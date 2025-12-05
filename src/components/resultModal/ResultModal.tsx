import { useHints } from "../../hooks/hints/useHints";
import { useModal } from "../../hooks/modal/useModal";
import { useTimer } from "../../hooks/timer/useTimer";
import type { Word } from "../../schema/CheatleSchema";
import type { Guess, Hint } from "../../types/types";
import GuessList from "../guessList/GuessList";
import styles from "./ResultModal.module.css";
import closeIcon from "/closeIcon.svg";

type ResultModalProps = {
    guesses: Guess[],
    highestScoringWords: Word[],
}

export default function ResultModal({
    guesses,
    highestScoringWords,
}: ResultModalProps) {
    const { minutesUsed, secondsUsed } = useTimer();
    const { hintsUsed, topWordHints } = useHints();
    const { closeModal } = useModal();

    const maxPossibleScore = highestScoringWords?.slice(0, 5).reduce((maxScore, word) => {
        return maxScore += word.value;
    }, 0);

    const topGuesses = guesses.slice(0, 5);
    const score = topGuesses.reduce((score, word) => {
        return score += word.value;
    }, 0);

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
            <GuessList guesses={topGuesses} shouldShowScore={false} />
            <div className={styles.highestScoringWords}>
                <h3>Highest scoring words:</h3>
                {Object.entries(topWordHints).map(([valueStr, words]) => {
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