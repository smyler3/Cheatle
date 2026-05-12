import { createContext, useContext } from "react";
import type { TileType, TopWords, Word } from "../../schema/CheatleSchema";

type FetchedData = {
    board: TileType[],
    validWords: Word[],
    topWords: TopWords,
    boardKey: string,
}

export const FetchedDataContext = createContext({} as FetchedData);

export const useFetchedData = () => useContext(FetchedDataContext);