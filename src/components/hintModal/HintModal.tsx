import { HINT_POINTS_REQUIRED } from "../../constants";
import { useFetchedData } from "../../hooks/fetchedData/useFetchedData";
import { useGameState } from "../../hooks/gameState/useGameState";
import { useModal } from "../../hooks/modal/useModal";
import type { WordSubset } from "../../types/types";
import styles from "./HintModal.module.css";
import closeIcon from "/closeIcon.svg";

export default function HintModal() {
    const { minTopWordValue } = useFetchedData();
    const { validWordsMap, hintPoints, handleUseHint } = useGameState();
    const { closeModal } = useModal();
    
    const numberOfHints = Math.floor(hintPoints / HINT_POINTS_REQUIRED);
    // Only looks at words which can be a top x word
    const topWordHints = new Map([...validWordsMap.entries()].filter(([key]) => Number(key) >= minTopWordValue));

    return (
        <>
            <button className={styles.closeButton} onClick={closeModal}>
                <img src={closeIcon} alt="Close Icon" />
            </button>
            <div className={styles.hintModal}>
                <h2>Hints</h2>
                <p>
                    Use hints to reveal letters from the top 5 words one at a time.
                    <br /><br />
                    Every word you find adds its length to your hint points. You gain one hint for every {HINT_POINTS_REQUIRED} hint points earned. 
                </p>
                <div className={styles.hintPointsContainer}>
                    <p>{hintPoints}/{HINT_POINTS_REQUIRED}</p>
                    <p>Available: {numberOfHints}</p>
                </div>
                {Array.from(topWordHints.entries()).map(([valueStr, words]) => {
                    const value = Number(valueStr);

                    return (
                        <section key={value}>
                            <p className={styles.pointSectionHeader}>{value} points</p>
                            <ol className={styles.hintsList}>
                                {Array.from(words.entries()).map(([text, wordSubset]: [text: string, wordSubset: WordSubset], index) => {
                                    const { revealedText, isGuessed } = wordSubset;
                                    const isWordRevealed = isGuessed || revealedText.length >= text.length;
                                    const areHintsAvailable = numberOfHints > 0;

                                    return (
                                        <li key={index} className={styles.hintItem}>
                                            <p 
                                                className={ `${styles.hintText} ${isGuessed && styles.guessedHintText}`}
                                            >
                                                {isWordRevealed ? text : `${revealedText}...`}
                                            </p>
                                            {!isWordRevealed && 
                                                <button 
                                                    className={styles.hintButton}
                                                    onClick={() => handleUseHint(value, index)}
                                                    disabled={!areHintsAvailable}
                                                >
                                                    Next
                                                </button>
                                            }
                                        </li>
                                    )
                                })}
                            </ol>
                        </section>
                    )
                })}
                <button 
                    className={styles.cancelButton}
                    onClick={closeModal}
                >
                    Close
                </button>
            </div>
        </>
    )
}