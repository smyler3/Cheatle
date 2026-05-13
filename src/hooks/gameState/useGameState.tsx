import { createContext, useContext } from "react";
import type { UseHintType } from "../useHints";
import type { UseTimerType } from "../useTimer";
import type { UseGuessType } from "../useGuesses";

type GameStateType = UseHintType & UseTimerType & UseGuessType;

export const GameStateContext = createContext<GameStateType>({} as GameStateType);

export const useGameState = () => useContext(GameStateContext);