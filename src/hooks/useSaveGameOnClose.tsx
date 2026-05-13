import { useEffect } from "react";
import type { UseTimerType } from "./useTimer";
import type { UseHintType } from "./useHints";
import type { UseGuessType } from "./useGuesses";

type useSaveGameOnCloseProps = {
    boardKey: string,
    timerData: UseTimerType,
    hintData: UseHintType,
    guessData: UseGuessType,
};

// Save game data before exiting the app
export default function useSaveGameOnClose({ boardKey, timerData, hintData, guessData }: useSaveGameOnCloseProps) {
    useEffect(() => {
        const updateLocalStorage = () => {
            const combinedState = {
                timeRemaining: timerData.timeRemaining,
                isTimerStarted: timerData.isTimerStarted,
                isTimerPaused: timerData.isTimerDone,
                isTimerDone: timerData.isTimerDone,
                
                hintPoints: hintData.hintPoints,
                hintsUsed: hintData.hintsUsed,
                topWordHints: Object.fromEntries(hintData.topWordHints.entries()),

                correctGuesses: guessData.correctGuesses,
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
    }, [boardKey, hintData.hintPoints, hintData.hintsUsed, hintData.topWordHints, timerData.isTimerStarted, timerData.isTimerPaused, timerData.timeRemaining, timerData.isTimerDone, guessData.correctGuesses]);
}