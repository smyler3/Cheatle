import { useState } from "react";
import { HINT_POINTS_REQUIRED } from "../constants";
import type { Hint, TopWords } from "../schema/CheatleSchema";
import type { StateSetter } from "../types/types";
import useGetSavedGameState from "./useGetSavedGameState";

type UseHintProps = {
    boardKey: string,
    isTimerDone: boolean,
    topWords: TopWords,
};

type UseHintType = {
    hintPoints: number,
    setHintPoints: StateSetter<number>,
    topWordHints: Map<number, Hint[]>,
    hintsUsed: number,
    markTopWordAsGuessed: (value: number, topWord: string) => void,
    handleUseHint: (value: number, wordIndex: number) => void,
};

export default function useHints({ boardKey, isTimerDone, topWords } : UseHintProps): UseHintType {
    const { savedGameState } = useGetSavedGameState({ boardKey });

    const [hintPoints, setHintPoints] = useState(savedGameState?.hintPoints ?? 0);
    const [hintsUsed, setHintsUsed] = useState(savedGameState?.hintsUsed ?? 0);
    const [topWordHints, setTopWordHints] = useState<Map<number, Hint[]>>(new Map());

    if (savedGameState?.topWordHints) {
        setTopWordHints(savedGameState.topWordHints);
    }
    else {
        const sortedTopWords = new Map<number, Hint[]>(
            [...topWords.entries()].sort(([a], [b]) => b - a)
        );
        setTopWordHints(sortedTopWords);
    };

    const markTopWordAsGuessed = (value: number, topWord: string) => {
        setTopWordHints(prev => {
            const wordsAtValue = prev.get(value);
            if (!wordsAtValue) return prev;

            const wordIndex = wordsAtValue.findIndex(word => word.text === topWord);
            if (wordIndex === -1) return prev;

            const updatedHints = wordsAtValue.map((word, index) =>
                index === wordIndex ? { ...word, isGuessed: true } : word
            );

            const updatedTopWordHints = new Map(prev).set(value, updatedHints);

            return updatedTopWordHints;
        })
    };

    const handleUseHint = (value: number, wordIndex: number) => {
        if (isTimerDone) {
            return;
        };

        setHintPoints(prev => prev - HINT_POINTS_REQUIRED);
        setHintsUsed(prev => prev + 1);
        setTopWordHints((prev: Map<number, Hint[]>) => {
            const updatedTopWordHints = new Map(prev);
            const updatedWordsAtValue = [...(updatedTopWordHints.get(value) ?? [])];
            const selectedWord = updatedWordsAtValue[wordIndex];

            const remainingHintText = selectedWord.text.replace(selectedWord.revealedText, '');
            const nextTile =
                remainingHintText.startsWith("Q") ? remainingHintText.slice(0, 2) : remainingHintText.slice(0, 1);

            const updatedHint = {
                ...selectedWord,
                revealedText: selectedWord.revealedText + nextTile,
            };

            updatedWordsAtValue[wordIndex] = updatedHint;
            updatedTopWordHints.set(value, updatedWordsAtValue);

            return updatedTopWordHints;
        });
    };

    return {
        hintPoints,
        setHintPoints,
        topWordHints,
        hintsUsed,
        markTopWordAsGuessed,
        handleUseHint,
    };
};