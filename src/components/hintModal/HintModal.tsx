import { HINT_POINTS_REQUIRED } from "../../constants";
import { useGameState } from "../../hooks/gameState/useGameState";
import { useModal } from "../../hooks/modal/useModal";
import type { Hint } from "../../schema/CheatleSchema";
import styles from "./HintModal.module.css";
import closeIcon from "/closeIcon.svg";

export default function HintModal() {
    const { closeModal } = useModal();
    const { hintPoints, topWordHints, handleUseHint } = useGameState();
    
    const numberOfHints = Math.floor(hintPoints / HINT_POINTS_REQUIRED);

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
                                {words.map((hint: Hint, index: number) => {
                                    const isWordRevealed = hint.isGuessed || hint.revealedText.length >= hint.text.length;
                                    const areHintsAvailable = numberOfHints > 0;

                                    return (
                                        <li key={index} className={styles.hintItem}>
                                            <p 
                                                className={ `${styles.hintText} ${hint.isGuessed && styles.guessedHintText}`}
                                            >
                                                {isWordRevealed ? hint.text : `${hint.revealedText}...`}
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