import { fetchCheatleData } from "../fetchCheatleData";
import { useQuery } from "@tanstack/react-query";
import { CheatleDataContext } from "./useCheatleData";
import defaultData from "../../constants/defaultData";

type CheatleDataProviderProps = {
    children: React.ReactNode,
};

export const CheatleDataProvider = ({ children }: CheatleDataProviderProps) => {
    const query = useQuery({
        queryKey: ["cheatle"],
        queryFn: () => fetchCheatleData(),
        refetchOnWindowFocus: false,
    });

    const data = query.isError ? defaultData : query.data;

    return (
        <CheatleDataContext.Provider
            value={{
                data: data,
                isLoading: query.isLoading,
            }}
        >
            {children}
        </CheatleDataContext.Provider>
    );
};
