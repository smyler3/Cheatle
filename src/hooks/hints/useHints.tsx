import { createContext, useContext } from "react";
import type { StateSetter } from "../../types/types";
import type { Hint } from "../../schema/CheatleSchema";

type HintContextType = {
    hintPoints: number,
    setHintPoints: StateSetter<number>,
    topWordHints: Map<number, Hint[]>,
    hintsUsed: number,
    markTopWordAsGuessed: (value: number, topWord: string) => void,
    handleUseHint: (value: number, wordIndex: number) => void,
};

export const HintContext = createContext<HintContextType>({} as HintContextType);

export const useHints = () => useContext(HintContext); 