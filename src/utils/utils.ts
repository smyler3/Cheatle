import { REQUIRED_TOP_WORDS } from "../constants";
import type { Word } from "../schema/CheatleSchema";
import type { Guess } from "../types/types";

export const binaryInsertion = (elem: Guess, array: Guess[]): Guess[] => {
    let left = 0, right = array.length;

    // Binary search for insert position
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (array[mid].value > elem.value) {
            left = mid + 1;
        }
        else {
            right = mid;
        }
    };

    return [...array.slice(0, left), elem, ...array.slice(left)];
};

export const isTopWord = (wordToCheck: string, topWords: Map<number, Word[]>): boolean => {
    for (const valueGroup of topWords.values()) {
        if (valueGroup.some(word => word.text === wordToCheck)) {
            return true;
        }; 
    };

    return false;
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