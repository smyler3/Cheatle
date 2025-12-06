import { useEffect, useState } from "react";
import { useModal } from "../modal/useModal";
import { useTimer } from "../timer/useTimer";
import { GameDataContext } from "./useGameData";
import { useChealteData } from "../useChealteData";
import type { Guess } from "../../types/types";

type GameDataProviderProps = {
    children: React.ReactNode,
};

export const GameDataProvider = ({ children }: GameDataProviderProps) => {
    const { data } = useChealteData();
    const { isTimerDone, stopTimer } = useTimer();
    const { openResultModal } = useModal();

    const [correctGuesses, setCorrectGuesses] = useState<Guess[]>([]);

    const endGame = () => {
        stopTimer();
        openResultModal();
    }

    useEffect(() => {
        if (isTimerDone) {
            endGame();
        }
    }, [isTimerDone]);

    const { highestScoringWords } = data;

    const maxPossibleScore = highestScoringWords.slice(0, 5).reduce((score, word) => {
        return score == word.value;
    })
    const score = correctGuesses.slice(0, 5).reduce((score, word) => {
        return score += word.value;
    }, 0);

    if (score === maxPossibleScore) {
        endGame();
    }



    return (
        <GameDataContext.Provider value={{
            correctGuesses,
            setCorrectGuesses,
            maxPossibleScore,
            score,
        }}>
            {children}
        </GameDataContext.Provider>
    )
}