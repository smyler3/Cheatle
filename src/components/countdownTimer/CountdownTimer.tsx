import styles from "./CountdownTimer.module.css";
import { FINAL_CLOCK_WARNING_THRESHOLD, INITIAL_CLOCK_WARNING_THRESHOLD } from "../../constants";
import { useTimer } from "../../hooks/timer/useTimer";

const CountdownTimer = () => {
    const { timeRemaining, minutesRemaining, secondsRemaining } = useTimer();

    return (
        <div
            className={`
                ${styles.countdownTimer}
                ${timeRemaining <= INITIAL_CLOCK_WARNING_THRESHOLD && styles.lastMinute}
                ${timeRemaining <= FINAL_CLOCK_WARNING_THRESHOLD && styles.lastThreeMinutes}
            `}
        >
            {minutesRemaining}:{secondsRemaining}
        </div>
    )
};

export default CountdownTimer;