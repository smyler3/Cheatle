import { useModal } from "../../hooks/modal/useModal";
import styles from "./InfoModal.module.css";
import closeIcon from "/closeIcon.svg";
import howToPlayMP4 from "/howToPlay.mp4";
import howToPlayWebm from "/howToPlay.webm";
import scoreExample from "/scoreExample.svg";
import hintVideoMP4 from "/hints.mp4";
import hintVideoWebm from "/hints.webm";

export default function InfoModal() {
    const { closeModal } = useModal(); 

    return (
        <>
            <button className={styles.closeButton} onClick={closeModal}>
                <img src={closeIcon} alt="Close Icon" />
            </button>
            <div className={styles.infoModal}>
                <h2 className={styles.modalHeading}>How to play</h2>
                <p className={styles.tagline}>Spell words using the tiles on the board.</p>
                <section className={styles.hintSection}>
                    <h3>Building Words:</h3>
                    <ol className={styles.hintList}>
                        <li>Tap any tile on the board, then tap adjacent tiles to spell a word.</li>
                        <li>Each tile on the board can only be used once per word.</li>
                        <li>Each word must use at least three tiles.</li>
                        <li>Tap any of the selected tiles a second time to submit your guess.</li>
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
                        <li>Each tile has a point value.</li>
                        <li>A words score is the sum of the tile point values used to spell it. </li>
                        <li>Your final score is the total value of your best 5 words.</li>
                        <li>Words you guess from the top 5 highest-scoring words are marked with a star.</li>
                    </ol>
                    <img src={scoreExample} alt="Example of score section" className={styles.image} />
                </section>
                <section className={styles.hintSection}>
                    <h3>Hints:</h3>
                    <ol className={styles.hintList}>
                        <li>Every word you spell will give you hint points equal to its length.</li>
                        <li>Every 20 hint points gives you 1 hint.</li>
                        <li>A hint reveals one letter from a top 5 word of your choice.</li>
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
                <section className={styles.hintSection}>
                    <h3>Winning:</h3>
                    <ol className={styles.hintList}>
                        <li>The game ends when you have the highest possible score or the timer runs out.</li>
                    </ol>
                </section>
                <button 
                    className={styles.cancelButton}
                    onClick={closeModal}
                >
                    Close
                </button>
                <p className={styles.credit}>Inspired by the amazing <a href="https://www.chiddle.net/" target="_blank" rel="noopener noreferrer" className={styles.creditLink}>Chiddle</a></p>
            </div>
        </>
    )
};