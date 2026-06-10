import type { GameStateType, ValidWordsMap, WordSubset } from "../types/types";

const convertValidWordsMapFromJson = (entries: [number, [string, WordSubset][]][]): ValidWordsMap => {
    return new Map(
        entries.map(([value, words]) => [
            value,
            new Map(words),
        ])
    );
};

export default function getSavedGameState(boardKey: string) {
    const rawData: string | null = localStorage.getItem("gameState");
    let savedBoardKey: string | null = null;
    let savedGameState: GameStateType | null = null;

    if (!rawData) {
        return { savedGameState };
    }

    try {
        const parsedData = JSON.parse(rawData);
        savedBoardKey = parsedData?.savedBoardKey;
        savedGameState = parsedData?.savedGameState;

        if (savedBoardKey !== boardKey) {
            return { savedGameState };
        };

        // Type safety
        if (
            !savedGameState ||
            !Array.isArray(savedGameState.validWordsMap) ||
            !Array.isArray(savedGameState.topGuesses) || 
            typeof savedGameState.isTimerStarted !== "boolean" ||
            typeof savedGameState.isTimerPaused !== "boolean" ||
            typeof savedGameState.timeRemaining !== "number" ||
            typeof savedGameState.isTimerDone !== "boolean" ||
            typeof savedGameState.hintPoints !== "number" ||
            typeof savedGameState.hintsUsed !== "number"
        ) {
            return { savedGameState };
        }

        const validWordsMap = convertValidWordsMapFromJson(savedGameState.validWordsMap);
        savedGameState = {...savedGameState, validWordsMap};
    } catch {
        return { savedGameState };
    }

    return { savedGameState }
};