import { GameStateContext } from "./useGameState";
import useHints from "../useHints";
import { useTimer } from "../useTimer";
import { useFetchedData } from "../fetchedData/useFetchedData";
import { useEffect, useMemo } from "react";
import getSavedGameState from "../../utils/getSavedGameState";
import useValidWords from "../useValidWords";
import { saveGame } from "../../utils/saveGame";

type GameDataProviderProps = {
    children: React.ReactNode;
};

export const GameStateProvider = ({ children }: GameDataProviderProps) => {
    const { apiVersion, boardKey } = useFetchedData();
    const { savedGameState } = getSavedGameState({ boardKey });

    if (!savedGameState) {
        localStorage.removeItem("gameState");
    }

    const validWordsData = useValidWords({ savedGameState });
    const timerData = useTimer({ savedGameState });
    const hintData = useHints({
        savedGameState,
        isTimerDone: timerData.isTimerDone,
        setValidWordsMap: validWordsData.setValidWordsMap,
    });

    // Every time the user quits, their data will be saved for when they rejoin
    useEffect(() => {
        const handleSave = () =>
            saveGame({
                gameState: { ...validWordsData, ...timerData, ...hintData },
                apiVersion,
            });

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
    }, [validWordsData, timerData, hintData, apiVersion]);

    const value = useMemo(
        () => ({
            ...validWordsData,
            ...timerData,
            ...hintData,
        }),
        [validWordsData, timerData, hintData],
    );

    return (
        <GameStateContext.Provider value={value}>
            {children}
        </GameStateContext.Provider>
    );
};
