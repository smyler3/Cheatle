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