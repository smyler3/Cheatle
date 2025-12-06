import { useState } from "react";
import { GameDataContext } from "./useGameData";
import { useChealteData } from "../useChealteData";
import type { Guess } from "../../types/types";

type GameDataProviderProps = {
    children: React.ReactNode,
};

export const GameDataProvider = ({ children }: GameDataProviderProps) => {
    const { data } = useChealteData();

    const [correctGuesses, setCorrectGuesses] = useState<Guess[]>([]);

    const maxPossibleScore = data?.highestScoringWords.slice(0, 5).reduce((maxScore, word) => {
        return maxScore += word.value;
    }, 0);
    const score = correctGuesses.slice(0, 5).reduce((score, word) => {
        return score += word.value;
    }, 0);

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