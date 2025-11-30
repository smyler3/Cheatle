import { ModalName } from "../constants";

export type Guess = {
    text: string,
    value: number,
    isTopWord: boolean,
};

export type ModalNameType = (typeof ModalName)[keyof typeof ModalName];