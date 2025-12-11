import { useEffect, useState } from "react";
import { HintContext } from "./useHints";
import { HINT_POINTS_REQUIRED } from "../../constants";
import { useCheatleData } from "../useCheatleData";
import { useTimer } from "../timer/useTimer";
import type { Hint } from "../../schema/CheatleSchema";

type HintProviderProps = {
    children: React.ReactNode,
};

export default function HintProvider({ children } : HintProviderProps) {
    const { data } = useCheatleData();
    const { isTimerDone } = useTimer();
    
    const [hintPoints, setHintPoints] = useState(0);
    const [topWordHints, setTopWordHints] = useState<Map<number, Hint[]>>(new Map());
    const [hintsUsed, setHintsUsed] = useState(0);

    useEffect(() => {
        if (data?.topWords) {
            const sortedTopWords = new Map(
                [...data.topWords.entries()].sort(([a], [b]) => b - a)
            );
            setTopWordHints(sortedTopWords);
        }
    }, [data])

    const markTopWordAsGuessed = (value: number, topWord: string) => {
        setTopWordHints(prev => {
            const wordsAtValue = prev.get(value);
            if (!wordsAtValue) return prev;

            const wordIndex = wordsAtValue.findIndex(word => word.text === topWord);
            if (wordIndex === -1) return prev;

            const updatedHints = wordsAtValue.map((word, index) =>
                index === wordIndex ? { ...word, revealedText: word.text, isGuessed: true } : word
            );

            return {
                ...prev,
                [value]: updatedHints
            };
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

    return (
        <HintContext.Provider value={{
            hintPoints,
            setHintPoints,
            topWordHints,
            hintsUsed,
            markTopWordAsGuessed,
            handleUseHint,
        }}>
            {children}
        </HintContext.Provider>
    );
};