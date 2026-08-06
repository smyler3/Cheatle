import type { UseTimerType } from "../hooks/useTimer";
import type { UseHintType } from "../hooks/useHints";
import type { UseValidWordsType } from "../hooks/useValidWords";
import type {
    GameStateSaveType,
    SavedGameStateType,
    ValidWordsMap,
} from "../types/types";

type saveGameProps = {
    gameState: UseValidWordsType & UseTimerType & UseHintType;
    apiVersion: number;
};

const convertValidWordsMapToJson = (validWordsMap: ValidWordsMap) => {
    return Array.from(validWordsMap.entries()).map(([value, words]) => [
        value,
        Array.from(words.entries()),
    ]);
};

export const saveGame = ({ gameState, apiVersion }: saveGameProps) => {
    const {
        puzzleDate,
        boardKey,
        validWordsMap,
        topGuesses,
        correctGuessCount,
        isTimerStarted,
        isTimerPaused,
        isTimerDone,
        timeRemaining,
        hintPoints,
        hintsUsed,
    } = gameState;
    const currentDate = new Date().toLocaleDateString("en-AU", {
        timeZone: "Australia/Melbourne",
    });

    // Try to prevent a bug where old data never clears
    if (puzzleDate !== currentDate) {
        localStorage.removeItem("gameState");
        return;
    }

    const combinedState: GameStateSaveType = {
        apiVersion,

        validWordsMap: convertValidWordsMapToJson(validWordsMap),
        topGuesses,
        correctGuessCount,

        isTimerStarted,
        isTimerPaused,
        isTimerDone,
        timeRemaining,

        hintPoints,
        hintsUsed,
    };

    const saveData: SavedGameStateType = {
        savedPuzzleDate: puzzleDate,
        savedBoardKey: boardKey,
        savedGameState: combinedState,
    };

    localStorage.setItem("gameState", JSON.stringify(saveData));
};
