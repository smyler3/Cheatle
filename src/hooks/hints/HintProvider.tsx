import { useEffect, useState } from "react";
import { HintContext } from "./useHints";
import type { Hint } from "../../types/types";
import { HINT_POINTS_REQUIRED } from "../../constants";
import { useChealteData } from "../useChealteData";
import type { Word } from "../../schema/CheatleSchema";

type HintProviderProps = {
    children: React.ReactNode,
};

export default function HintProvider({ children } : HintProviderProps) {
    const { data } = useChealteData();
    
    const [hintPoints, setHintPoints] = useState(0);
    const [topWordHints, setTopWordHints] = useState<Record<number, Hint[]>>({});

    const markTopWordAsGuessed = (value: number, topWord: string) => {
        setTopWordHints(prev => {
            const wordsAtValue = prev[value];
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
        setHintPoints(prev => prev - HINT_POINTS_REQUIRED);
        setTopWordHints((prev: Record<number, Hint[]>) => {
            const updatedTopWordHints = { ...prev };
            const updatedWordsAtValue = [...updatedTopWordHints[value]];
            const selectedWord = updatedWordsAtValue[wordIndex];

            const remainingText = selectedWord.text.replace(selectedWord.revealedText, '');
            const nextTile = remainingText.charAt(0) === "Q" ? remainingText.slice(0, 2) : remainingText.slice(0, 1);
            const updatedHint = {
                ...selectedWord,
                revealedText: selectedWord.revealedText + nextTile,
            };

            updatedWordsAtValue[wordIndex] = updatedHint;
            updatedTopWordHints[value] = updatedWordsAtValue;

            return {...updatedTopWordHints};
        });
    };

    useEffect(() => {
        const topWordsByValue: Record<number, Hint[]> = {};

        // Group words by value
        data?.highestScoringWords.forEach((word: Word) => {
            const { value, text } = word;
            const hintWord: Hint = { text, revealedText: "", isGuessed: false };

            if (topWordsByValue[value]) {
                topWordsByValue[value].push(hintWord);
            } else {
                topWordsByValue[value] = [hintWord];
            }
        });

        setTopWordHints(topWordsByValue);
    }, [data]);

    return (
        <HintContext.Provider value={{
            hintPoints,
            setHintPoints,
            topWordHints,
            setTopWordHints,
            markTopWordAsGuessed,
            handleUseHint,
        }}>
            {children}
        </HintContext.Provider>
    );
};