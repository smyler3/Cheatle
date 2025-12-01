import { HINT_POINTS_REQUIRED } from "../../constants";
import { useModal } from "../../hooks/modal/useModal";
import type { Hint, StateSetter } from "../../types/types";
import styles from "./HintModal.module.css";

type HintModalProps = {
    hintPoints: number,
    hintWords: Record<number, Hint[]>,
    setHintPoints: StateSetter<number>,
    setHintWords: StateSetter<Record<number, Hint[]>>,
};

export default function HintModal({ hintPoints, hintWords, setHintPoints, setHintWords }: HintModalProps) {
    const { closeModal } = useModal();
    const numberOfHints = Math.floor(hintPoints / HINT_POINTS_REQUIRED); 

    const handleUseHint = (value: number, wordIndex: number) => {
        setHintPoints(prev => prev - HINT_POINTS_REQUIRED);
        setHintWords((prev: Record<number, Hint[]>)  => {
            // Clone object and nested array
            const updatedWords = { ...prev };
            updatedWords[value] = [...updatedWords[value]];

            const selectedWord = updatedWords[value][wordIndex];

            // Extract next tile
            const remainingText = selectedWord.text.replace(selectedWord.revealedText, '');
            const nextTile = remainingText.charAt(0) === "Q" ? remainingText.slice(0, 2) : remainingText.slice(0, 1);

            const updatedHint = {
                ...selectedWord,
                revealedText: selectedWord.revealedText + nextTile
            };

            // replace the updated object
            updatedWords[value][wordIndex] = updatedHint;

            return updatedWords;
        });
        console.log("made it");
    }

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
            {Object.entries(hintWords).map(([valueStr, words]) => {
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
                                        <p className={styles.hintText}>{hint.revealedText ? hint.revealedText : "..."}</p>
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