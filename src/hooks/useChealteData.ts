import { useQuery } from "@tanstack/react-query";
import { CheatleResponseSchema, type CheatleResponse } from "../schema/CheatleSchema";

const fetchCheatleData = async (): Promise<CheatleResponse> => {
    const response = await fetch(import.meta.env.VITE_API_URL);
    if (!response.ok) {
        throw new Error("Network request failed");
    };
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return CheatleResponseSchema.parse(jsonResponse);
};

export const useChealteData = () => {
    return useQuery({
        queryKey: ["chealte"],
        queryFn: () => fetchCheatleData(),
    });
};