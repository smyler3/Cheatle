import { GameStateContext } from "./useGameState";
import useHints from "../useHints";
import { useTimer } from "../useTimer";
import { useGuesses } from "../useGuesses";
import { useFetchedData } from "../fetchedData/useFetchedData";
import { useMemo } from "react";
import getSavedGameState from "../../utils/getSavedGameState";
import useSaveGameOnClose from "../useSaveGameOnClose";

type GameDataProviderProps = {
    children: React.ReactNode,
};

export const GameStateProvider = ({ children }: GameDataProviderProps) => {
    const { boardKey } = useFetchedData();
    const { savedGameState } = getSavedGameState(boardKey);

    // Returned null?
    if (!savedGameState) {
        localStorage.clear();
    }

    const timerData = useTimer({ savedGameState });
    const hintData = useHints({ savedGameState, isTimerDone: timerData.isTimerDone });
    const guessData = useGuesses({ savedGameState });

    // Every time the user quits, their data will be saved for when they rejoin
    useSaveGameOnClose({ boardKey, timerData, hintData, guessData });

    const value = useMemo(() => ({
        ...timerData,
        ...hintData,
        ...guessData,
    }), [timerData, hintData, guessData]);

    return (
        <GameStateContext.Provider value={value}>
            {children}
        </GameStateContext.Provider>
    )
}
