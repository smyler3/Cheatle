import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { Guess } from "../../types/types";

type GameDataType = {
    score: number,
    maxPossibleScore: number,
    correctGuesses: Guess[],
    setCorrectGuesses: Dispatch<SetStateAction<Guess[]>>,
};

export const GameDataContext = createContext<GameDataType>({} as GameDataType);

export const useGameData = () => useContext(GameDataContext);