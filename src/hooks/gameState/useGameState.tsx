import { createContext, useContext } from "react";
import type { UseHintType } from "../useHints";
import type { UseTimerType } from "../useTimer";
// import type { UseGuessType } from "../useGuesses";
import type { UseValidWordsType } from "../useValidWords";

type GameStateType = UseHintType & UseTimerType & UseValidWordsType;

export const GameStateContext = createContext<GameStateType>({} as GameStateType);

export const useGameState = () => useContext(GameStateContext);