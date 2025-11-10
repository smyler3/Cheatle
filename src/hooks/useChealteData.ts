import { useQuery } from "@tanstack/react-query";
import { CheatleResponseSchema, type CheatleResponse } from "../schema/chealteData";

const fetchCheatleData = async (): Promise<CheatleResponse> => {
    const response = await fetch("/cheatle-api");
    if (!response.ok) {
        throw new Error("Network request failed");
    };
    return CheatleResponseSchema.parse(response);
};

export const useChealteData = () => {
    return useQuery({
        queryKey: ["chealte"],
        queryFn: () => fetchCheatleData(),
    });
};