import { useState } from "react";
import { HINT_POINTS_REQUIRED } from "../../constants";
import { useModal } from "../../hooks/modal/useModal";
import type { Hint } from "../../schema/CheatleSchema";
import styles from "./ResultModal.module.css";
import closeIcon from "/closeIcon.svg";
import hideIcon from "/hideIcon.svg";
import showIcon from "/showIcon.svg";
import { useGameState } from "../../hooks/gameState/useGameState";

interface ResultModalProps {
    backgroundRef: React.RefObject<HTMLDivElement | null>
}

export default function ResultModal({ backgroundRef }: ResultModalProps) {
    const { score, maxPossibleScore, minutesUsed, secondsUsed, hintsUsed, topWordHints, hintPoints } = useGameState();
    const { closeModal } = useModal();

    const [shouldHideSpoilers, setShouldHideSpoilers] = useState(false);

    if (backgroundRef.current) {
        backgroundRef.current.style.backgroundColor = shouldHideSpoilers ? "#000000AA" : "#00000025";
        backgroundRef.current.style.backdropFilter = shouldHideSpoilers ? "blur(10px)" : "blur(0)" ;
    }

    return (
        <>
            <button className={styles.closeButton} onClick={closeModal}>
                <img src={closeIcon} alt="Close Icon" />
            </button>
            <div className={styles.resultModal}>
            <h2 className={styles.modalHeading}>Results</h2>
            <div className={styles.statsContainer}>
                <span className={styles.statContainer}>
                    <div className={styles.stat}>{score} / {maxPossibleScore}</div>
                    <p className={styles.statDescription}>Score</p>
                </span>
                <span className={styles.statContainer}>
                    <div className={styles.stat}>
                        {minutesUsed}:{secondsUsed}
                    </div>
                    <p className={styles.statDescription}>Time</p>
                </span>
                <span className={styles.statContainer}>
                    <div className={styles.stat}>{hintsUsed} / {hintsUsed + Math.floor(hintPoints / HINT_POINTS_REQUIRED)}</div>
                    <p className={styles.statDescription}>Hints</p>
                </span>
            </div>
            <button 
                className={styles.toggleSpoilersButton}
                onClick={() => setShouldHideSpoilers(prev => !prev)}
            >
                <img 
                    src={shouldHideSpoilers ? showIcon : hideIcon } 
                    alt={shouldHideSpoilers ? "Show spoilers icon" : "Hide spoilers icon"} 
                />
                <p>{shouldHideSpoilers ? "Show Spoilers" : "Hide Spoilers"}</p>
            </button>
            <div className={styles.topWords}>
                <h3 className={styles.topWordsHeader}>Highest scoring words:</h3>
                {Array.from(topWordHints.entries()).map(([valueStr, words]) => {
                    const value = Number(valueStr);

                    return (
                        <section key={value} className={styles.pointsSection}>
                            <p className={styles.pointSectionHeader}>{value} points</p>
                            <ol className={styles.wordList}>
                                {words.map((hint: Hint, index: number) => {
                                    const wasGuessed = hint.isGuessed;

                                    return (
                                        <li key={index} className={`${wasGuessed && styles.guessed}`}>
                                            {shouldHideSpoilers 
                                                ? "..." 
                                                : (
                                                    <>
                                                    <span className={styles.hintText}>{hint.revealedText}</span>
                                                    <span>{hint.text.replace(hint.revealedText, '')}</span>
                                                    </>
                                                )
                                            }
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