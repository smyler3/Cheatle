import styles from "./LiveGuessDisplay.module.css";
import undoIcon from "/undoIcon.svg";

type LiveGuessDisplayProps = {
    guess: string,
    lastGuess: string,
    handleUndoClick: () => void,
};

const LiveGuessDisplay = ({ guess, lastGuess, handleUndoClick }: LiveGuessDisplayProps) => {
    
    return (
        <div className={styles.displayContainer}>
            <input 
                className={`${styles.guess} ${guess === '' && styles.lastGuess}`}
                type="text" 
                value={guess === '' ? lastGuess : guess}
                readOnly
            />
            <button
                onClick={handleUndoClick}
            >
                <img src={undoIcon} alt="" />
            </button>
        </div>
    )
};

export default LiveGuessDisplay;