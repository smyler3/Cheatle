import { HINT_POINTS_REQUIRED } from "../../constants";
import { useModal } from "../../hooks/modal/useModal";
import type { Hint } from "../../types/types";
import styles from "./HintModal.module.css";

type HintModalProps = {
    hintPoints: number,
    hintWords: Record<number, Hint[]>,
}

export default function HintModal({ hintPoints, hintWords }: HintModalProps) {
    const { closeModal } = useModal();
    const numberOfHints = Math.floor(hintPoints / HINT_POINTS_REQUIRED); 

    // const handleUseHint = () => {
    //     // Remove hint points
    //     // Add tile to revealed word
    // }
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
            {Object.entries(hintWords).map(([value, words]) => {
                return (
                    <section key={value}>
                        <h3>{value} points</h3>
                        <ol className={styles.hintsList}>
                            {words.map((hint: Hint, index: number) => {
                                const shouldShowHintButton = hint.revealedText.length < hint.text.length;
                                const areHintsAvailable = numberOfHints > 0;
                                return (
                                    <li key={index} className={styles.hintItem}>
                                        <p>{hint.revealedText ? hint.revealedText : "..."}</p>
                                        {shouldShowHintButton && 
                                            <button 
                                                className={styles.hintButton}
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