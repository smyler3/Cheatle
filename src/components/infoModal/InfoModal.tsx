import { useModal } from "../../hooks/modal/useModal";
import styles from "./InfoModal.module.css";

export default function InfoModal() {
    const { closeModal } = useModal(); 
    return (
        <div className={styles.infoModal}>
            <h2 className={styles.modalHeading}>How to play</h2>
            <p className={styles.tagline}>Find the 5 highest-scoring words in 10 minutes</p>
            <section className={styles.hintSection}>
                <h3>Building Words:</h3>
                <ol className={styles.hintList}>
                    <li>3+ letters</li>
                    <li>Adjacent letters only (horizontal, vertical, or diagonal)</li>
                    <li>Each letter used once per word</li>
                </ol>
                <img src="" alt="" className={styles.image} />
            </section>
            <section className={styles.hintSection}>
                <h3>Scoring:</h3>
                <ol className={styles.hintList}>
                    <li>Each letter has a value</li>
                    <li>A word's score = the sum of it's letters</li>
                    <li>Your final score = your best 5 words only</li>
                </ol>
                <img src="" alt="" className={styles.image} />
            </section>
            <section className={styles.hintSection}>
                <h3>Hints:</h3>
                <ol className={styles.hintList}>
                    <li>Every word you find adds its score toward earning hints</li>
                    <li>Every 20 total points = 1 hint</li>
                    <li>A hint lets you reveal one letter from a lowest-scoring top-5 word of your choice</li>
                </ol>
                <img src="" alt="" className={styles.image} />
            </section>
            <button 
                className={styles.playButton}
                onClick={closeModal}
            >
                Play
            </button>
            <p className={styles.credit}>Inspired by the amazing <a href="" className={styles.creditLink}>Chiddle</a></p>
        </div>
    )
};