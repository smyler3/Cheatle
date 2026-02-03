import { createContext, useContext } from "react";
import type { fetchCheatleData } from "../fetchCheatleData";

type CheatleDataContextType = {
    data: Awaited<ReturnType<typeof fetchCheatleData>> | undefined,
    isLoading: boolean,
    isError: boolean,
};

export const CheatleDataContext = createContext<CheatleDataContextType>({} as CheatleDataContextType);

export const useCheatleData = () => useContext(CheatleDataContext);