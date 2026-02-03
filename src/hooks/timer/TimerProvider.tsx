import type React from "react";
import { TimerContext } from "./useTimer";
import { useEffect, useState } from "react";
import { MINUTES_IN_A_GAME, SECONDS_IN_A_MINUTE } from "../../constants";
import { useCheatleData } from "../cheatleData/useCheatleData";
import { useLocalStorageData } from "../localStorageData.tsx/useLocalStorageData";

type TimerProviderProps = {
    children: React.ReactNode,
};

export const TimerProvider = ({ children }: TimerProviderProps) => {
    const { isLoading } = useCheatleData();
    const { savedGameState, registerSnapshotGetter } = useLocalStorageData();

    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(SECONDS_IN_A_MINUTE * MINUTES_IN_A_GAME);
    const [isTimerDone, setIsTimerDone] = useState(false);
    
    const minutesRemaining = String(Math.floor(timeRemaining / SECONDS_IN_A_MINUTE));
    const secondsRemaining = String(timeRemaining % SECONDS_IN_A_MINUTE).padStart(2, '0');
    const minutesUsed = String(Math.floor(((SECONDS_IN_A_MINUTE * MINUTES_IN_A_GAME) - timeRemaining) / 60));
    const secondsUsed = String(((SECONDS_IN_A_MINUTE * MINUTES_IN_A_GAME) - timeRemaining) % 60).padStart(2, '0');

    const startTimer = () => {
        if (!isTimerDone) {
            setIsTimerStarted(true);
        }
    };

    const stopTimer = () => {
        setIsTimerStarted(false);
        setIsTimerDone(true);
    };

    useEffect(() => {
        if (savedGameState?.timeRemaining) {
            setTimeRemaining(savedGameState.timeRemaining);
        };
        if (savedGameState?.isTimerDone) {
            setIsTimerDone(savedGameState.isTimerDone);
        };
    }, [savedGameState]);

    useEffect(() => {
        const intervalID = setInterval(() => {
            if (isTimerStarted && !isLoading) {
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
    }, [isTimerStarted, isLoading]);

    // Passes this data to localStorage hook when requested
    useEffect(() => {
        registerSnapshotGetter(() => ({
            timeRemaining,
            isTimerDone,
        }));
    }, [timeRemaining, isTimerDone, registerSnapshotGetter]);

    return (
        <TimerContext.Provider value={{
            isTimerStarted,
            timeRemaining,
            isTimerDone,
            minutesRemaining,
            secondsRemaining,
            minutesUsed,
            secondsUsed,
            startTimer,
            stopTimer,
        }}>
            {children}
        </TimerContext.Provider>
    );
};