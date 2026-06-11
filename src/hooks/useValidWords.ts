import { useMemo, useState } from "react";
import type { Word } from "../schema/CheatleSchema";
import type { GameStateType, StateSetter, ValidWordsMap,  WordSubset } from "../types/types";
import { useFetchedData } from "./fetchedData/useFetchedData";

type UseValidWordsProps = {
    savedGameState: GameStateType | null,
}

export type UseValidWordsType = {
    validWordsMap: ValidWordsMap,
    setValidWordsMap: StateSetter<ValidWordsMap>;
    topGuesses: number[];
    addToTopGuesses: (newValue: number) => void;
    correctGuessCount: number;
    setCorrectGuessCount: StateSetter<number>;
    score: number;
};

const createValidWordsMap = (validWords: Word[]) => {
    const validWordsMap: ValidWordsMap = new Map();

    validWords.forEach(word => {
        const { text, value, revealedText, isGuessed } = word;

        const wordSubset: WordSubset = {
            revealedText,
            isGuessed
        };

        const innerWordMap = validWordsMap.get(value);

        if (innerWordMap) {
            innerWordMap.set(text, wordSubset);
        }
        else {
            validWordsMap.set(value, new Map([[ text, wordSubset ]]));
        }
    });

    return new Map([...validWordsMap.entries()].sort(([a], [b]) => b - a));
};

export default function useValidWords({ savedGameState }: UseValidWordsProps) {
    const { validWords } = useFetchedData();
    const [validWordsMap, setValidWordsMap] = useState<ValidWordsMap>(
        savedGameState?.validWordsMap ??
        createValidWordsMap(validWords)
    );
    const [topGuesses, setTopGuesses] = useState<number[]>(
        savedGameState?.topGuesses ??
        new Array(5).fill(0)
    );
    const [correctGuessCount, setCorrectGuessCount] = useState(0);
    const score = useMemo(
        () => topGuesses.reduce((score, value) => score += value, 0),
        [topGuesses]
    );

    // Ensures only the top 5 words are used
    const handleAddTopGuesses = (newValue: number) => {
        for (let i = 0; i < topGuesses.length; i += 1) {
            const value = topGuesses[i];

            if (newValue >= value) {
                setTopGuesses(prev => [...prev.slice(0, i), newValue, ...prev.slice(i, 4)]);
                return;
            }
        }
    }

    return {
        validWordsMap,
        setValidWordsMap,
        topGuesses,
        addToTopGuesses: handleAddTopGuesses,
        correctGuessCount,
        setCorrectGuessCount,
        score,
    }
}