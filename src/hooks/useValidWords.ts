import { useState } from "react";
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
    setTopGuesses: StateSetter<number[]>;
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
        []
    );
    const [correctGuessCount, setCorrectGuessCount] = useState(0);

    const score: number = topGuesses.reduce((score, value) => {
        return score += value;
    }, 0);

    return {
        validWordsMap,
        setValidWordsMap,
        topGuesses,
        setTopGuesses,
        correctGuessCount,
        setCorrectGuessCount,
        score,
    }
}