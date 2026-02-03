import { useModal } from "../../hooks/modal/useModal";
import { useTimer } from "../../hooks/timer/useTimer";
import styles from "./InfoModal.module.css";
import closeIcon from "/closeIcon.svg";
import howToPlayMP4 from "/ezgif.com-optimize.mp4";
import howToPlayWebm from "/ezgif.com-optimize.webm";
import scoreExample from "/score.svg";
import hintVideoMP4 from "/hintVideo.mp4";
import hintVideoWebm from "/hintVideo.webm";

export default function InfoModal() {
    const { isTimerStarted, startTimer } = useTimer();
    const { closeModal } = useModal(); 

    const handleCloseModal = () => {
        if (!isTimerStarted) {
            startTimer();
        };
        closeModal();
    };

    return (
        <>
            <button className={styles.closeButton} onClick={handleCloseModal}>
                <img src={closeIcon} alt="" />
            </button>
            <div className={styles.infoModal}>
                <h2 className={styles.modalHeading}>How to play Cheatle</h2>
                <p className={styles.tagline}>Find the 5 highest-scoring words in 10 minutes</p>
                <section className={styles.hintSection}>
                    <h3>Building Words:</h3>
                    <ol className={styles.hintList}>
                        <li>3+ letters</li>
                        <li>Adjacent letters only (horizontal, vertical, or diagonal)</li>
                        <li>Each tile used max once per word</li>
                        <li>Select an already selected tile to submit your guess</li>
                    </ol>
                    <video 
                        className={styles.video}
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                    >
                        <source src={howToPlayWebm} type="video/webm"></source>
                        <source src={howToPlayMP4} type="video/mp4"></source>
                    </video>
                </section>
                <section className={styles.hintSection}>
                    <h3>Scoring:</h3>
                    <ol className={styles.hintList}>
                        <li>Each letter has a value</li>
                        <li>A word's score = the sum of it's letters</li>
                        <li>Your final score = your best 5 words only</li>
                        <li>Top 5 answers are marked with a star</li>
                    </ol>
                    <img src={scoreExample} alt="" className={styles.image} />
                </section>
                <section className={styles.hintSection}>
                    <h3>Hints:</h3>
                    <ol className={styles.hintList}>
                        <li>Every word you find adds its length toward earning hints</li>
                        <li>Every 20 total points = 1 hint</li>
                        <li>A hint lets you reveal one letter from a top-5 word of your choice</li>
                    </ol>
                    <video 
                        className={styles.video}
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                    >
                        <source src={hintVideoWebm} type="video/webm"></source>
                        <source src={hintVideoMP4} type="video/mp4"></source>
                    </video>
                </section>
                <button 
                    className={styles.playButton}
                    onClick={handleCloseModal}
                >
                    Play
                </button>
                <p className={styles.credit}>Inspired by the amazing <a href="https://www.chiddle.net/" target="_blank" rel="noopener noreferrer" className={styles.creditLink}>Chiddle</a></p>
            </div>
        </>
    )
};