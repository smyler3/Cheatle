import styles from "./HintButton.module.css";

type HintButtonProps = {
    points: number,
};

const POINTS_FOR_HINT = 25;

const HintButton = ({ points }: HintButtonProps) => {
    const hintsAvailable = Math.floor(points / POINTS_FOR_HINT);

    return (
        <button
            className={styles.button}
        >
            <span 
                className={styles.hintProgressIndicator}
                style={{ width: '100px' }}
            ></span>
            <span 
                className={styles.scoreIncreaseIndicator}
            >
                +1
            </span>
            Hint {points} {hintsAvailable}
        </button>
    )
};

export default HintButton;