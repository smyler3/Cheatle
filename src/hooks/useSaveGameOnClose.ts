import { useEffect } from "react";
import type { UseTimerType } from "./useTimer";
import type { UseHintType } from "./useHints";
// import type { UseGuessType } from "./useGuesses";
import type { UseValidWordsType } from "./useValidWords";
import type { GameStateSaveType, ValidWordsMap } from "../types/types";

type useSaveGameOnCloseProps = {
    boardKey: string,
    validWordsData: UseValidWordsType,
    timerData: UseTimerType,
    hintData: UseHintType,
    // guessData: UseGuessType,
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
export default function useSaveGameOnClose({ boardKey, validWordsData, timerData, hintData }: useSaveGameOnCloseProps) {
    useEffect(() => {
        const updateLocalStorage = () => {
            const combinedState: GameStateSaveType = {
                validWordsMap: convertValidWordsMapToJson(validWordsData.validWordsMap),
                topGuesses: validWordsData.topGuesses,

                isTimerStarted: timerData.isTimerStarted,
                isTimerPaused: timerData.isTimerDone,
                isTimerDone: timerData.isTimerDone,
                timeRemaining: timerData.timeRemaining,
                
                hintPoints: hintData.hintPoints,
                hintsUsed: hintData.hintsUsed,
                // topWordHints: Object.fromEntries(hintData.topWordHints.entries()),

                // correctGuesses: guessData.correctGuesses,
            }

            const saveData = {
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
    }, [boardKey, validWordsData.validWordsMap, validWordsData.topGuesses, hintData.hintPoints, hintData.hintsUsed, timerData.isTimerStarted, timerData.isTimerPaused, timerData.timeRemaining, timerData.isTimerDone]);
}