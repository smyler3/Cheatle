import { type Dispatch, type SetStateAction, useState } from "react";
import type { GameStateType, Guess } from "../types/types";
import type { Word } from "../schema/CheatleSchema";
import { REQUIRED_TOP_WORDS } from "../constants";
import { useFetchedData } from "./fetchedData/useFetchedData";

type UseGuessProps = {
    savedGameState: GameStateType | null,
};

export type UseGuessType = {
    score: number,
    maxPossibleScore: number,
    correctGuesses: Guess[],
    setCorrectGuesses: Dispatch<SetStateAction<Guess[]>>,
};

export const getMaxPossibleScore = (topWords: Map<number, Word[]>): number => {
    let count = 0;
    let maxPossibleScore = 0;

    const reversedTopWords = new Map(
        [...topWords.entries()].sort(([a], [b]) => b - a)
    );

    reversedTopWords.forEach(valueGroup => {
        for (let i = 0; i < valueGroup.length; i += 1) {
            if (count <= REQUIRED_TOP_WORDS) {
                maxPossibleScore += valueGroup[i].value;
                count += 1;
            }
            else {
                return maxPossibleScore;
            }
        };
    });

    return maxPossibleScore;
};

export const useGuesses = ({ savedGameState }: UseGuessProps): UseGuessType => {
    const { topWords } = useFetchedData();

    const [correctGuesses, setCorrectGuesses] = useState<Guess[]>(savedGameState?.correctGuesses ?? []);

    const maxPossibleScore = getMaxPossibleScore(topWords);

    const score = correctGuesses.slice(0, 5).reduce((score, word) => {
        return score += word.value;
    }, 0);

    return {
        correctGuesses,
        setCorrectGuesses,
        maxPossibleScore,
        score,
    }
}