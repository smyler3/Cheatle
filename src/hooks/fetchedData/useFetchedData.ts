import { createContext, useContext } from "react";
import type { TileType, Word } from "../../schema/CheatleSchema";

type FetchedData = {
    board: TileType[],
    validWords: Word[],
    // topWords: TopWords,
    maxPossibleScore: number,
    minTopWordValue: number,
    puzzleCount: number,
    puzzleDate: string,
    boardKey: string,
}

export const FetchedDataContext = createContext({} as FetchedData);

export const useFetchedData = () => useContext(FetchedDataContext);