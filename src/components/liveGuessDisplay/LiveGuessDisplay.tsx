import styles from "./LiveGuessDisplay.module.css";

const LiveGuessDisplay = ({ guess }) => {
    return (
        <div
            className={styles.guess}
        >
            {guess}
        </div>
    )
};

export default LiveGuessDisplay;