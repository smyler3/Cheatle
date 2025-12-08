import { useEffect, useState } from "react";
import { GameDataContext } from "./useGameData";
import { useChealteData } from "../useChealteData";
import type { Guess } from "../../types/types";
import { getMaxPossibleScore } from "../../utils/utils";

type GameDataProviderProps = {
    children: React.ReactNode,
};

export const GameDataProvider = ({ children }: GameDataProviderProps) => {
    const { data } = useChealteData();

    const [correctGuesses, setCorrectGuesses] = useState<Guess[]>([]);
    const [maxPossibleScore, setMaxPossibleScore] = useState<number>(null);
    
    useEffect(() => {
        if (data?.topWords) {
            setMaxPossibleScore(getMaxPossibleScore(data.topWords));
        }
    }, [data]);

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