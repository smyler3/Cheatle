import { ModalName } from "../constants";

export type Guess = {
    text: string,
    value: number,
    isTopWord: boolean,
};

export type Hint = {
    text: string,
    revealedText: string,
};

export type ModalNameType = (typeof ModalName)[keyof typeof ModalName];