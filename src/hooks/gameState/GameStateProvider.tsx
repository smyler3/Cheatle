import { GameStateContext } from "./useGameState";
import useHints from "../useHints";
import { useTimer } from "../useTimer";
import type { TopWords } from "../../schema/CheatleSchema";
import { useGuesses } from "../useGuesses";
import useSaveGameOnClose from "../useSaveOnClose";

type GameDataProviderProps = {
    boardKey: string,
    topWords: TopWords,
    children: React.ReactNode,
};

export const GameStateProvider = ({ boardKey, topWords, children }: GameDataProviderProps) => {
    const timerData = useTimer({ boardKey });
    const hintData = useHints({ boardKey, isTimerDone: timerData.isTimerDone, topWords });
    const guessData = useGuesses({ boardKey, topWords });

    // Every time the user quits, their data will be saved for when they rejoin
    useSaveGameOnClose({ boardKey, timerData, hintData, guessData });

    return (
        <GameStateContext.Provider value={{
            ...timerData,
            ...hintData,
            ...guessData,
        }}>
            {children}
        </GameStateContext.Provider>
    )
}