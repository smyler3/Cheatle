import { useEffect } from "react";
import type { UseTimerType } from "./useTimer";
import type { UseHintType } from "./useHints";
import type { UseValidWordsType } from "./useValidWords";
import type { GameStateSaveType, SavedGameStateType, ValidWordsMap } from "../types/types";

type useSaveGameOnCloseProps = {
    puzzleDate: string,
    boardKey: string,
    apiVersion: number,
    validWordsData: UseValidWordsType,
    timerData: UseTimerType,
    hintData: UseHintType,
};

const convertValidWordsMapToJson = (validWordsMap: ValidWordsMap) => {
    return Array.from(validWordsMap.entries()).map(
        ([value, words]) => [
            value,
            Array.from(words.entries())
        ]
    );
};

// Save game data before exiting the app
export default function useSaveGameOnClose({ puzzleDate, boardKey, apiVersion, validWordsData, timerData, hintData }: useSaveGameOnCloseProps) {
    useEffect(() => {
        const updateLocalStorage = () => {
            const currentDate = new Date().toLocaleDateString('en-AU', { timeZone: 'Australia/Melbourne' });

            // Try to prevent a bug where old data never clears
            if (puzzleDate !== currentDate) {
                localStorage.clear();
            }

            const combinedState: GameStateSaveType = {
                apiVersion,

                validWordsMap: convertValidWordsMapToJson(validWordsData.validWordsMap),
                topGuesses: validWordsData.topGuesses,
                correctGuessCount: validWordsData.correctGuessCount,

                isTimerStarted: timerData.isTimerStarted,
                isTimerPaused: timerData.isTimerDone,
                isTimerDone: timerData.isTimerDone,
                timeRemaining: timerData.timeRemaining,
                
                hintPoints: hintData.hintPoints,
                hintsUsed: hintData.hintsUsed,
            }

            const saveData: SavedGameStateType = {
                savedPuzzleDate: puzzleDate,
                savedBoardKey: boardKey,
                savedGameState: combinedState,
            };

            localStorage.setItem("gameState", JSON.stringify(saveData));
        };

        const handleSave = () => updateLocalStorage();

        window.addEventListener("beforeunload", handleSave);

        const visibilityHandler = () => {
            if (document.visibilityState === "hidden") {
                handleSave();
            }
        };

        document.addEventListener("visibilitychange", visibilityHandler);

        return () => {
            window.removeEventListener("beforeunload", handleSave);
            document.removeEventListener("visibilitychange", visibilityHandler);
        };
    }, [puzzleDate, boardKey, apiVersion, validWordsData.validWordsMap, validWordsData.topGuesses, validWordsData.correctGuessCount, hintData.hintPoints, hintData.hintsUsed, timerData.isTimerStarted, timerData.isTimerPaused, timerData.timeRemaining, timerData.isTimerDone]);
}