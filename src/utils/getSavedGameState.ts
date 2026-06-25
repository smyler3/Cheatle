import { CURRENT_API_VERSION } from "../constants";
import type { GameStateType, ValidWordsMap, WordSubset } from "../types/types";

const convertValidWordsMapFromJson = (entries: [number, [string, WordSubset][]][]): ValidWordsMap => {
    return new Map(
        entries.map(([value, words]) => [
            value,
            new Map(words),
        ])
    );
};

type GetSavedGameStateProps = {
    boardKey: string;
};

export default function getSavedGameState({ boardKey }: GetSavedGameStateProps): { savedGameState: GameStateType | null } {
    const rawData: string | null = localStorage.getItem("gameState");
    let savedPuzzleDate: string | null = null;
    let savedBoardKey: string | null = null;
    let savedGameState: GameStateType | null = null;

    if (!rawData) {
        return { savedGameState: null };
    }

    try {
        const currentDate = new Date().toLocaleDateString('en-AU', { timeZone: 'Australia/Melbourne' });
        const parsedData = JSON.parse(rawData);

        savedPuzzleDate = parsedData?.savedPuzzleDate;
        savedBoardKey = parsedData?.savedBoardKey;
        savedGameState = parsedData?.savedGameState;

        // Data not found
        if (!savedPuzzleDate || !savedBoardKey || !savedGameState) {
            return { savedGameState: null };
        }

        // Try to prevent a bug where old data never clears
        if (savedPuzzleDate !== currentDate || savedBoardKey !== boardKey) {
            return { savedGameState: null };
        };

        // Type safety
        if (
            !savedGameState ||
            !Array.isArray(savedGameState.validWordsMap) ||
            !Array.isArray(savedGameState.topGuesses) || 
            typeof savedGameState.correctGuessCount !== "number" ||
            typeof savedGameState.isTimerStarted !== "boolean" ||
            typeof savedGameState.isTimerPaused !== "boolean" ||
            typeof savedGameState.timeRemaining !== "number" ||
            typeof savedGameState.isTimerDone !== "boolean" ||
            typeof savedGameState.hintPoints !== "number" ||
            typeof savedGameState.hintsUsed !== "number" ||
            typeof savedGameState.apiVersion !== "number"
        ) {
            return { savedGameState: null };
        }

        if (savedGameState.apiVersion !== CURRENT_API_VERSION) {
            return { savedGameState: null };
        }

        const validWordsMap = convertValidWordsMapFromJson(savedGameState.validWordsMap);
        savedGameState = {...savedGameState, validWordsMap};
    } catch {
        return { savedGameState: null };
    }

    return { savedGameState }
};