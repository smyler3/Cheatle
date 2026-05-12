import { createPortal } from "react-dom";
import ModalManager from "../modalManager/ModalManager";
import styles from "./Home.module.css";
import cheatleLogo from "/cheatleLogo.svg";

export default function Home() {
    const puzzleCount = "141";
    const puzzleDate = "11/05/2026";

    return (
        <main className={styles.homeMain}>
            {createPortal(
                <ModalManager />, 
                document.body
            )}
            <img src={cheatleLogo} alt="" className={styles.logo} />
            <h1>Cheatle</h1>
            <h2 className={styles.heading2}>Daily Boggle Puzzle</h2>
            <p>Spell the 5 highest-scoring words in 10 minutes.</p>
            <button>Play</button>
            <button>How to play</button>
            <p>Puzzle #{puzzleCount} • {puzzleDate}</p>
        </main>
    )
}