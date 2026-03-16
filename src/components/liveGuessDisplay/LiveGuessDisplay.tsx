import styles from "./LiveGuessDisplay.module.css";
import undoIcon from "/undoIcon.svg";

type LiveGuessDisplayProps = {
    guess: string,
    value: number,
    lastGuess: string,
    lastValue: string,
    handleUndoClick: () => void,
};

const LiveGuessDisplay = ({ guess, value, lastGuess, lastValue, handleUndoClick }: LiveGuessDisplayProps) => {
    return (
        <div className={styles.displayContainer}>
            <input 
                className={`${styles.guess} ${guess === '' && styles.lastGuess}`}
                type="text" 
                value={guess === '' ? lastGuess : guess}
                readOnly
            />
            <input 
                className={`${styles.value} ${guess === '' && styles.lastGuess}`}
                type="text"
                value={value === 0 ? lastValue : value}
                readOnly
            />
            <button
                onClick={handleUndoClick}
            >
                <img src={undoIcon} alt="Undo Icon" />
            </button>
        </div>
    )
};

export default LiveGuessDisplay;