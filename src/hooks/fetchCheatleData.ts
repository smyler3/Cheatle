import { CheatleResponseSchema, type CheatleResponse } from "../schema/CheatleSchema";

export const fetchCheatleData = async (): Promise<CheatleResponse> => {
    const base = import.meta.env.VITE_API_URL!;
    const API_URL = new URL('/cheatle-api', base).toString();
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Network request failed");
    };

    const jsonResponse = await response.json();
    const res = CheatleResponseSchema.parse(jsonResponse);

    return res;
};