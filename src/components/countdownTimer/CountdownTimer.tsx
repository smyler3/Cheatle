import styles from "./CountdownTimer.module.css";
import { FINAL_CLOCK_WARNING_THRESHOLD, INITIAL_CLOCK_WARNING_THRESHOLD } from "../../constants";
import { useGameState } from "../../hooks/gameState/useGameState";

const CountdownTimer = () => {
    const { timeRemaining, minutesRemaining, secondsRemaining } = useGameState();

    return (
        <div
            className={`
                ${styles.countdownTimer}
                ${timeRemaining <= INITIAL_CLOCK_WARNING_THRESHOLD && timeRemaining > FINAL_CLOCK_WARNING_THRESHOLD && styles.lastThreeMinutes}
                ${timeRemaining <= FINAL_CLOCK_WARNING_THRESHOLD && styles.lastMinute}
            `}
        >
            {minutesRemaining}:{secondsRemaining}
        </div>
    )
};

export default CountdownTimer;