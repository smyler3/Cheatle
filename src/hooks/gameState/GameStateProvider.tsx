import { GameStateContext } from "./useGameState";
import useHints from "../useHints";
import { useTimer } from "../useTimer";
import { useFetchedData } from "../fetchedData/useFetchedData";
import { useMemo } from "react";
import getSavedGameState from "../../utils/getSavedGameState";
import useSaveGameOnClose from "../useSaveGameOnClose";
import useValidWords from "../useValidWords";

type GameDataProviderProps = {
    children: React.ReactNode,
};

export const GameStateProvider = ({ children }: GameDataProviderProps) => {
    const { apiVersion, boardKey } = useFetchedData();
    const { savedGameState } = getSavedGameState(boardKey);

    if (!savedGameState) {
        localStorage.clear();
    }

    const validWordsData = useValidWords({ savedGameState });
    const timerData = useTimer({ savedGameState });
    const hintData = useHints({ savedGameState, isTimerDone: timerData.isTimerDone, setValidWordsMap: validWordsData.setValidWordsMap });

    // Every time the user quits, their data will be saved for when they rejoin
    useSaveGameOnClose({ boardKey, apiVersion, validWordsData, timerData, hintData });

    const value = useMemo(() => ({
        ...validWordsData,
        ...timerData,
        ...hintData,
    }), [validWordsData, timerData, hintData]);

    return (
        <GameStateContext.Provider value={value}>
            {children}
        </GameStateContext.Provider>
    )
}
