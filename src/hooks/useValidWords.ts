import { useEffect, useMemo, useState } from "react";
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
    puzzleDate: string;
    boardKey: string;
};

const createValidWordsMap = (validWords: Word[]) => {
    const validWordsMap: ValidWordsMap = new Map();

    validWords.forEach(word => {
        const { text, value } = word;

        const wordSubset: WordSubset = {
            revealedText: "",
            isGuessed: false,
            hintsUsed: 0,
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
    const { validWords, puzzleDate, boardKey } = useFetchedData();

    const [validWordsMap, setValidWordsMap] = useState<ValidWordsMap>(() => createValidWordsMap(validWords));
    const [topGuesses, setTopGuesses] = useState<number[]>(() => new Array(5).fill(0));
    const [correctGuessCount, setCorrectGuessCount] = useState(0);

    const score = useMemo(
        () => topGuesses.reduce((score, value) => score += value, 0),
        [topGuesses]
    );

    useEffect(() => {
        if (!savedGameState) return;

        setValidWordsMap(savedGameState.validWordsMap);
        setTopGuesses(savedGameState.topGuesses);
        setCorrectGuessCount(savedGameState.correctGuessCount ?? 0);
    }, [savedGameState]);

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
        puzzleDate,
        boardKey,
    }
}