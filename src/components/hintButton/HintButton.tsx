import { useHints } from "../../hooks/hints/useHints";
import { useModal } from "../../hooks/modal/useModal";
import styles from "./HintButton.module.css";

type HintButtonProps = {
    points: number,
};

const POINTS_FOR_HINT = 25;

const HintButton = ({ points }: HintButtonProps) => {
    const { hintPoints } = useHints();
    const { openHintModal } = useModal();
    const hintsAvailable = Math.floor(points / POINTS_FOR_HINT);

    return (
        <button
            className={styles.button}
            onClick={openHintModal}
        >
            <span 
                className={styles.hintProgressIndicator}
                style={{ 
                    width: `calc(${Math.min(1, hintPoints / POINTS_FOR_HINT) * 100}% + 20px)`, 
                    transition: `width ${Math.min(Math.min(1, hintPoints / POINTS_FOR_HINT)) * 1.5}s ease-in-out`
                }}
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