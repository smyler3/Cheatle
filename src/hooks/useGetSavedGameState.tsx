import type { GameStateType } from "../types/types";
import type { Hint } from "../schema/CheatleSchema";

type UseLocalStorageProps = {
    boardKey: string,
};

const convertTopWordHintsToMapFromJson = (record: Map<number, Hint[]>): Map<number, Hint[]> => {
    return new Map(
        Object.entries(record)
            .map(([key, value]) => [Number(key), value] as [number, Hint[]])
            .sort(([a], [b]) => b - a) // descending
    );
};

// Need to use state or a provider to prevent re-calling this over and over?
export default function useGetSavedGameState({ boardKey }: UseLocalStorageProps) {
    const rawData: string | null = localStorage.getItem("gameState");
    let savedBoardKey: string | null = null;
    let savedGameState: GameStateType | null = null;

    if (!rawData) {
        localStorage.clear();
        return { savedGameState };
    }

    try {
        const parsedData = JSON.parse(rawData);
        savedBoardKey = parsedData?.savedBoardKey;
        savedGameState = parsedData?.savedGameState;

        if (savedBoardKey !== boardKey) {
            localStorage.clear();
            return { savedGameState };
        };

        // Type safety
        if (
            !savedGameState ||
            typeof savedGameState.timeRemaining !== "number" ||
            typeof savedGameState.isTimerDone !== "boolean" ||
            typeof savedGameState.hintPoints !== "number" ||
            typeof savedGameState.hintsUsed !== "number" ||
            !Array.isArray(savedGameState.correctGuesses)
        ) {
            localStorage.clear();
            return { savedGameState };
        }

        const topWordHintsMap = convertTopWordHintsToMapFromJson(savedGameState.topWordHints)
        savedGameState = {...savedGameState, topWordHints: topWordHintsMap};
    } catch {
        localStorage.clear();
    }

    return { savedGameState }
};