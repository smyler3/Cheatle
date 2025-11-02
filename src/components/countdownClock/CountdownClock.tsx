import { useEffect, useState } from "react";
import styles from "./CountdownClock.module.css";
import { FINAL_CLOCK_WARNING_THRESHOLD, INITIAL_CLOCK_WARNING_THRESHOLD, MINUTES_IN_A_GAME, SECONDS_IN_A_MINUTE } from "../../constants";

const CountdownClock = () => {
    const [timeRemaining, setTimeRemaining] = useState(SECONDS_IN_A_MINUTE * MINUTES_IN_A_GAME);
    const minutes = String(Math.floor(timeRemaining / SECONDS_IN_A_MINUTE));
    const seconds = String(timeRemaining % SECONDS_IN_A_MINUTE).padStart(2, '0')

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0) {
                    clearInterval(intervalID);
                    return 0;
                }
                return prev - 1;
            });
            console.log("count");
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);

    return (
        <div
            className={`
                ${styles.countdownClock}
                ${timeRemaining <= INITIAL_CLOCK_WARNING_THRESHOLD && styles.lastMinute}
                ${timeRemaining <= FINAL_CLOCK_WARNING_THRESHOLD && styles.lastThreeMinutes}
            `}
        >
            {minutes}:{seconds}
        </div>
    )
};

export default CountdownClock;