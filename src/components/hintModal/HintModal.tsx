import { HINT_POINTS_REQUIRED } from "../../constants";
import { useHints } from "../../hooks/hints/useHints";
import { useModal } from "../../hooks/modal/useModal";
import type { Hint } from "../../types/types";
import styles from "./HintModal.module.css";

export default function HintModal() {
    const { closeModal } = useModal();
    const { hintPoints, topWordHints, handleUseHint } = useHints();
    console.log(topWordHints);
    const numberOfHints = Math.floor(hintPoints / HINT_POINTS_REQUIRED); 

    return (
        <div className={styles.hintModal}>
            <h2>Hints</h2>
            <p>
                Use hints to reveal letters from the top 5 words one at a time.
                <br /><br />
                You gain one hint for every 20 points earned from entered words.
            </p>
            <div className={styles.hintPointsContainer}>
                <p>{hintPoints}/{HINT_POINTS_REQUIRED}</p>
                <p>Available: {numberOfHints}</p>
            </div>
            {Object.entries(topWordHints).map(([valueStr, words]) => {
                const value = Number(valueStr);

                return (
                    <section key={value}>
                        <h3>{value} points</h3>
                        <ol className={styles.hintsList}>
                            {words.map((hint: Hint, index: number) => {
                                const shouldShowHintButton = hint.revealedText.length < hint.text.length;
                                const areHintsAvailable = numberOfHints > 0;
                                return (
                                    <li key={index} className={styles.hintItem}>
                                        <p 
                                            className={ `${styles.hintText} ${hint.isGuessed && styles.guessedHintText}`}
                                        >
                                            {hint.revealedText ? hint.revealedText : "..."}
                                        </p>
                                        {shouldShowHintButton && 
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
                className={styles.closeButton}
                onClick={closeModal}
            >
                Close
            </button>
        </div>
    )
}