import { useQuery } from "@tanstack/react-query";
import { CheatleResponseSchema, type CheatleResponse } from "../schema/CheatleSchema";

const fetchCheatleData = async (): Promise<CheatleResponse> => {
    const response = await fetch(import.meta.env.VITE_API_URL);
    if (!response.ok) {
        throw new Error("Network request failed");
    };
    const jsonResponse = await response.json();
    console.log("json", jsonResponse);
    const res = CheatleResponseSchema.parse(jsonResponse);
    console.log("res", res);
    return res;
};

export const useCheatleData = () => {
    return useQuery({
        queryKey: ["cheatle"],
        queryFn: () => fetchCheatleData(),
    });
};