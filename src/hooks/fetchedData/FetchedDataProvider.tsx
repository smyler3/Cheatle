import { CURRENT_API_VERSION } from "../../constants";
import defaultData from "../../constants/defaultData";
import type { CheatleResponse } from "../../schema/CheatleSchema";
import type { fetchCheatleData } from "../fetchCheatleData";
import { FetchedDataContext } from "./useFetchedData";

type FetchedDataProviderProps = {
    isError: boolean,
    data: Awaited<ReturnType<typeof fetchCheatleData>> | undefined,
    children: React.ReactNode,
}

export default function FetchedDataProvider({ isError, data, children }: FetchedDataProviderProps) {
    const invalidData = isError || data == undefined || data.apiVersion !== CURRENT_API_VERSION;
    const fetchedData: CheatleResponse = invalidData ? defaultData : data;
    const boardKey: string = fetchedData.board.reduce((key, tile) => key += tile.text, "");

    const { board, validWords, maxPossibleScore, minTopWordValue, puzzleCount, puzzleDate, apiVersion } = fetchedData;

    return (
        <FetchedDataContext.Provider value={{ board, validWords, maxPossibleScore, minTopWordValue, puzzleCount, puzzleDate, apiVersion, boardKey}}>
            {children}
        </FetchedDataContext.Provider>
    )
}