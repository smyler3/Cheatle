import styles from "./HintModal.module.css";

type hintModalProps = {
    handleCloseButton: () => void,
};

export default function HintModal({
    handleCloseButton
}: hintModalProps) {
    return (
        <div className={styles.hintModal}>
            <h2>Hints</h2>
            <p>
                Use hints to reveal letters from the top 5 words one at a time.
                <br /><br />
                You gain one hint for every 20 points earned from entered words.
            </p>
            <div className={styles.hintPointsContainer}>
                <p>{48}/20</p>
                <p>Available: {"2"}</p>
            </div>
            <section>
                <h3>13 points</h3>
                <ol className={styles.hintsList}>
                    <li className={styles.hintItem}>
                        <p>Word</p>
                        <button className={styles.hintButton}>Next</button>
                    </li>
                </ol>
            </section>
            <section>
                <h3>13 points</h3>
                <ol className={styles.hintsList}>
                    <li className={styles.hintItem}>
                        <p>Word</p>
                        <button className={styles.hintButton}>Next</button>
                    </li><li className={styles.hintItem}>
                        <p>Word</p>
                        <button className={styles.hintButton}>Next</button>
                    </li><li className={styles.hintItem}>
                        <p>Word</p>
                        <button className={styles.hintButton}>Next</button>
                    </li>
                </ol>
            </section>
            <section>
                <h3>13 points</h3>
                <ol className={styles.hintsList}>
                    <li className={styles.hintItem}>
                        <p>Word</p>
                        <button className={styles.hintButton}>Next</button>
                    </li>
                    <li className={styles.hintItem}>
                        <p>Word</p>
                        <button className={styles.hintButton}>Next</button>
                    </li><li className={styles.hintItem}>
                        <p>Word</p>
                        <button className={styles.hintButton}>Next</button>
                    </li>
                </ol>
            </section>
            <button 
                className={styles.closeButton}
                onClick={handleCloseButton}
            >
                Close
            </button>
        </div>
    )
}