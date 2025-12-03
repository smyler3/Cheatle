import styles from "./CountdownClock.module.css";
import { FINAL_CLOCK_WARNING_THRESHOLD, INITIAL_CLOCK_WARNING_THRESHOLD } from "../../constants";
import { useTimer } from "../../hooks/timer/useTimer";

const CountdownClock = () => {
    const { timeRemaining, minutesRemaining, secondsRemaining } = useTimer();

    return (
        <div
            className={`
                ${styles.countdownClock}
                ${timeRemaining <= INITIAL_CLOCK_WARNING_THRESHOLD && styles.lastMinute}
                ${timeRemaining <= FINAL_CLOCK_WARNING_THRESHOLD && styles.lastThreeMinutes}
            `}
        >
            {minutesRemaining}:{secondsRemaining}
        </div>
    )
};

export default CountdownClock;