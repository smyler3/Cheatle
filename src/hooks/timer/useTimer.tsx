import { createContext, useContext } from "react";

type TimerContextType = {
    isTimerStarted: boolean,
    timeRemaining: number,
    isTimerDone: boolean,
    minutesRemaining: string,
    secondsRemaining: string,
    minutesUsed: string,
    secondsUsed: string,
    startTimer: () => void,
    stopTimer: () => void,
};

export const TimerContext = createContext<TimerContextType>({} as TimerContextType);

export const useTimer = () => useContext(TimerContext);