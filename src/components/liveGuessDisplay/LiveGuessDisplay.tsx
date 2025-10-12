import styles from "./LiveGuessDisplay.module.css";

type LiveGuessDisplayProps = {
    guess: string,
};

const LiveGuessDisplay = ({ guess }: LiveGuessDisplayProps) => {
    return (
        <div
            className={styles.guess}
        >
            {guess}
        </div>
    )
};

export default LiveGuessDisplay;