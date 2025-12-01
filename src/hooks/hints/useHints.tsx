import { createContext, useContext } from "react";
import type { Hint, StateSetter } from "../../types/types";

type HintContextType = {
    hintPoints: number,
    setHintPoints: StateSetter<number>,
    topWordHints: Record<number, Hint[]>,
    setTopWordHints: StateSetter<Record<number, Hint[]>>,
    markTopWordAsGuessed: (value: number, topWord: string) => void,
    handleUseHint: (value: number, wordIndex: number) => void,
};

export const HintContext = createContext<HintContextType>({} as HintContextType);

export const useHints = () => useContext(HintContext); 