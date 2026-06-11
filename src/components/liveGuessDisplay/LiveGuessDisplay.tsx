import styles from "./LiveGuessDisplay.module.css";
import undoIcon from "/undoIcon.svg";
import submitIcon from "/submitIcon.svg";
import type { CurrentGuessType, LastGuessType } from "../../types/types";

type LiveGuessDisplayProps = {
    currentGuess: CurrentGuessType;
    lastGuess: LastGuessType;
    handleUndoClick: () => void,
    handleSubmitClick: (currentGuess: CurrentGuessType) => void,
};

const LiveGuessDisplay = ({ currentGuess, lastGuess, handleUndoClick, handleSubmitClick }: LiveGuessDisplayProps) => {
    const guessText = currentGuess.text;
    const guessValue = currentGuess.value;
    const lastGuessText = lastGuess.text;
    const lastGuessValue = lastGuess.value;

    return (
        <div className={styles.displayContainer}>
            <button
                onClick={handleUndoClick}
            >
                <img src={undoIcon} alt="Undo Icon" />
            </button>
            <input 
                className={`${styles.guess} ${guessText === '' && styles.lastGuess}`}
                type="text" 
                value={guessText === '' ? lastGuessText : guessText}
                readOnly
            />
            <input 
                className={`${styles.value} ${guessText === '' && styles.lastGuess}`}
                type="text"
                value={guessValue === 0 ? lastGuessValue : guessValue}
                readOnly
            />
            <button
                onClick={() => handleSubmitClick(currentGuess)}
            >
                <img src={submitIcon} alt="Submit Icon" />
            </button>
        </div>
    )
};

export default LiveGuessDisplay;