import { useEffect } from "react";

// Needs typing

// Save game data before exiting the app
export default function useSaveOnClose({ boardKey, timerData, hintData, guessData }) {
    // Maybe move higher to avoid constantly re-running this
    useEffect(() => {
        const updateLocalStorage = () => {
            const combinedState = {
                timeRemaining: timerData.timeRemaining,
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
    }, [boardKey, hintData, timerData, guessData]);
}