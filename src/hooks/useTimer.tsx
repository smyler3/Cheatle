import { useEffect, useState } from "react";
import { MINUTES_IN_A_GAME, SECONDS_IN_A_MINUTE } from "../constants";
import type { GameStateType } from "../types/types";

type UseTimerProps = {
    savedGameState: GameStateType | null,
}

export type UseTimerType = {
    isTimerStarted: boolean,
    isTimerPaused: boolean,
    timeRemaining: number,
    isTimerDone: boolean,
    minutesRemaining: string,
    secondsRemaining: string,
    minutesUsed: string,
    secondsUsed: string,
    startTimer: () => void,
    pauseTimer: () => void,
    stopTimer: () => void,
};

export const useTimer = ({ savedGameState }: UseTimerProps): UseTimerType => {
    const [isTimerStarted, setIsTimerStarted] = useState(savedGameState?.isTimerStarted ?? false);
    const [isTimerPaused, setIsTimerPaused] = useState(savedGameState?.isTimerPaused ?? false);
    const [timeRemaining, setTimeRemaining] = useState(savedGameState?.timeRemaining ?? SECONDS_IN_A_MINUTE * MINUTES_IN_A_GAME);
    const [isTimerDone, setIsTimerDone] = useState(savedGameState?.isTimerDone ?? false);
    
    const minutesRemaining = String(Math.floor(timeRemaining / SECONDS_IN_A_MINUTE));
    const secondsRemaining = String(timeRemaining % SECONDS_IN_A_MINUTE).padStart(2, '0');
    const minutesUsed = String(Math.floor(((SECONDS_IN_A_MINUTE * MINUTES_IN_A_GAME) - timeRemaining) / 60));
    const secondsUsed = String(((SECONDS_IN_A_MINUTE * MINUTES_IN_A_GAME) - timeRemaining) % 60).padStart(2, '0');

    const startTimer = () => {
        if (!isTimerDone) {
            setIsTimerStarted(true);
            setIsTimerPaused(false);
        }
    };

    const pauseTimer = () => {
        if (isTimerStarted && !isTimerDone) {
            setIsTimerPaused(true);
        }
    };

    useEffect(() => {
        const intervalID = setInterval(() => {
            if (isTimerStarted && !isTimerPaused && !isTimerDone) {
                setTimeRemaining((prev) => {
                    if (prev <= 0) {
                        setIsTimerDone(true);
                        clearInterval(intervalID);
                        return 0;
                    }
                    return prev - 1;
                });
            };
        }, 1000);

        return () => clearInterval(intervalID);
    }, [isTimerStarted, isTimerPaused, isTimerDone]);

    const stopTimer = () => {
        setIsTimerPaused(false);
        setIsTimerDone(true);
    };

    return {
        isTimerStarted,
        isTimerPaused,
        timeRemaining,
        isTimerDone,
        minutesRemaining,
        secondsRemaining,
        minutesUsed,
        secondsUsed,
        startTimer,
        pauseTimer,
        stopTimer,
    };
};