import { useState } from "react";
import { HINT_POINTS_REQUIRED } from "../constants";
import type { GameStateType, StateSetter, ValidWordsMap, WordSubset } from "../types/types";
type UseHintProps = {
    savedGameState: GameStateType | null,
    isTimerDone: boolean,
    setValidWordsMap: StateSetter<ValidWordsMap>,
};

export type UseHintType = {
    hintPoints: number,
    setHintPoints: StateSetter<number>,
    hintsUsed: number,
    handleUseHint: (value: number, wordIndex: number) => void,
};

export default function useHints({ savedGameState, isTimerDone, setValidWordsMap } : UseHintProps): UseHintType {
    const [hintPoints, setHintPoints] = useState(savedGameState?.hintPoints ?? 0);
    const [hintsUsed, setHintsUsed] = useState(savedGameState?.hintsUsed ?? 0);

    const handleUseHint = (value: number, wordIndex: number) => {
        if (isTimerDone) {
            return;
        };

        setHintPoints(prev => prev - HINT_POINTS_REQUIRED);
        setHintsUsed(prev => prev + 1);
        setValidWordsMap(prev => {
            const innerWordMap = prev.get(value);

            if (!innerWordMap) {
                return prev;
            }

            const text = Array.from(innerWordMap.keys())[wordIndex];
            const oldWord = innerWordMap.get(text);

            if (!oldWord) {
                return prev;
            }

            const { revealedText } = oldWord;

            const remainingHintText = text.replace(revealedText, '');
            const nextTile = remainingHintText.startsWith("Q") ? remainingHintText.slice(0, 2) : remainingHintText.slice(0, 1);

            const newWord = { 
                ...oldWord,
                revealedText: oldWord.revealedText + nextTile,
                hintsUsed: oldWord.hintsUsed + nextTile.length,
            }

            const updatedInnerWordMap: Map<string, WordSubset> = new Map(innerWordMap.set(text, newWord));
            const updatedValidWords: ValidWordsMap = new Map(prev).set(value, updatedInnerWordMap);

            return updatedValidWords;
        })
    };

    return {
        hintPoints,
        setHintPoints,
        hintsUsed,
        handleUseHint,
    };
};