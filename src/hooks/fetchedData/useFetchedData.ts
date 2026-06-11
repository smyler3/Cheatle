import { createContext, useContext } from "react";
import type { TileType, Word } from "../../schema/CheatleSchema";

type FetchedData = {
    board: TileType[],
    validWords: Word[],
    maxPossibleScore: number,
    minTopWordValue: number,
    puzzleCount: number,
    puzzleDate: string,
    apiVersion: number,
    boardKey: string,
}

export const FetchedDataContext = createContext({} as FetchedData);

export const useFetchedData = () => useContext(FetchedDataContext);