import { ModalName, TILE_STATE } from "../constants";
import type { Hint } from "../schema/CheatleSchema";

export type Guess = {
    text: string,
    value: number,
    isTopWord: boolean,
};

export type LastGuessType = {
    text: string,
    tilePositions: number[],
    result: typeof TILE_STATE[keyof typeof TILE_STATE],
};

export type ModalNameType = (typeof ModalName)[keyof typeof ModalName];

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type tileColourType = {
    default: string,
    selected: string,
};

export type gameState = {
    timeRemaining: number;
    isTimerDone: boolean;
    hintPoints: number;
    hintsUsed: number;
    topWordHints: Map<number, Hint[]>;
    correctGuesses: Guess[];
}