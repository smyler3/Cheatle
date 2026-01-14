import { useEffect, useState } from "react";
import styles from "./LiveGuessDisplay.module.css";

type LiveGuessDisplayProps = {
    guess: string,
};

const LiveGuessDisplay = ({ guess }: LiveGuessDisplayProps) => {
    const [lastGuess, setLastGuess] = useState<string>('');

    useEffect(() => {
        if (guess !== '') {
            setLastGuess(guess)
        }
    }, [guess]);
    
    return (
        <input 
            className={`${styles.guess} ${guess === '' && styles.lastGuess}`}
            type="text" 
            value={guess === '' ? lastGuess : guess}
            readOnly
        />
    )
};

export default LiveGuessDisplay;