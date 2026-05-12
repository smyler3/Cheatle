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
    const fetchedData: CheatleResponse = isError || data == undefined ? defaultData : data;
    const boardKey: string = fetchedData.board.reduce((key, tile) => key += tile.text, "");

    const { board, validWords, topWords } = fetchedData;

    return (
        <FetchedDataContext.Provider value={{ board, validWords, topWords, boardKey}}>
            {children}
        </FetchedDataContext.Provider>
    )
}