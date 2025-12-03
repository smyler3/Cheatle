import { createContext, useContext } from "react";

export type TimerContextType = {
    isTimerStarted: boolean,
    timeRemaining: number,
    minutesRemaining: string,
    secondsRemaining: string,
    minutesUsed: string,
    secondsUsed: string,
    startTimer: () => void,
    stopTimer: () => void,
};

export const TimerContext = createContext<TimerContextType>({} as TimerContextType);

export const useTimer = () => useContext(TimerContext);