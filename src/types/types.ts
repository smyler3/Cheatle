import { ModalName } from "../constants";

export type Guess = {
    text: string,
    value: number,
    isTopWord: boolean,
};

export type LastGuessType = {
    tilePositions: number[],
    result: 'correct' | 'incorrect' | 'idle',
};

export type ModalNameType = (typeof ModalName)[keyof typeof ModalName];

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type tileColourType = {
    default: string,
    selected: string,
};