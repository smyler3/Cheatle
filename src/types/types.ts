import { ModalName, TILE_STATE } from "../constants";
// import type { Hint } from "../schema/CheatleSchema";

export type Guess = {
    text: string,
    value: number,
    isTopWord: boolean,
};

export type WordSubset = {
  revealedText: string,
  isGuessed: boolean,
};

export type ValidWordsMap = Map<number, Map<string, WordSubset>>;

export type LastGuessType = {
    text: string,
    value: string,
    tilePositions: number[],
    result: typeof TILE_STATE[keyof typeof TILE_STATE],
};

export type ModalNameType = (typeof ModalName)[keyof typeof ModalName];

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type TileColourType = {
    default: string,
    selected: string,
};

interface BaseGameStateType {
    topGuesses: number[];
    isTimerStarted: boolean;
    isTimerPaused: boolean;
    timeRemaining: number;
    isTimerDone: boolean;
    hintPoints: number;
    hintsUsed: number;
}

export type GameStateType = BaseGameStateType & {
    validWordsMap: ValidWordsMap;
    // topWordHints: Map<number, Hint[]>;
    // correctGuesses: Guess[];
}

export type GameStateSaveType = BaseGameStateType & {
    validWordsMap: (number | [string, WordSubset][])[][];
}