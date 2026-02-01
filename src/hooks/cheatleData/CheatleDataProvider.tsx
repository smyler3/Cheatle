import { fetchCheatleData } from "../fetchCheatleData";
import { useQuery } from "@tanstack/react-query";
import { CheatleDataContext } from "./useCheatleData";

type CheatleDataProviderProps = {
    children: React.ReactNode,
};

export const CheatleDataProvider = ({ children }: CheatleDataProviderProps) => {
    const query = useQuery({
        queryKey: ["cheatle"],
        queryFn: () => fetchCheatleData(),
        refetchOnWindowFocus: false,
    });

    // // Example boardKey derivation
    // const boardKey = useMemo(() => {
    //     if (!query.data?.board) return null;

    //     return query.data.board.join("");
    // }, [query.data]);

    return (
        <CheatleDataContext.Provider
            value={{
                data: query.data,
                isLoading: query.isLoading,
                isError: query.isError,
            }}
        >
            {children}
        </CheatleDataContext.Provider>
    );
};
