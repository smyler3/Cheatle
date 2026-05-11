import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { Guess, StateSetter } from "../../types/types";
import type { Hint } from "../../schema/CheatleSchema";

type GameStateType = {
    score: number,
    maxPossibleScore: number,
    correctGuesses: Guess[],
    setCorrectGuesses: Dispatch<SetStateAction<Guess[]>>,

    hintPoints: number,
    setHintPoints: StateSetter<number>,
    topWordHints: Map<number, Hint[]>,
    hintsUsed: number,
    markTopWordAsGuessed: (value: number, topWord: string) => void,
    handleUseHint: (value: number, wordIndex: number) => void,

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

export const GameStateContext = createContext<GameStateType>({} as GameStateType);

export const useGameState = () => useContext(GameStateContext);