import { ModalName, TILE_STATE } from "../constants";

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

export type CurrentGuessType = {
    text: string,
    value: number,
    prevTileOrder: number[];
    prevTilePositions: boolean[];
};

export type IndicatorType = {
    id: string, 
    value: number
};

interface BaseGameStateType {
    topGuesses: number[];
    correctGuessCount: number;
    isTimerStarted: boolean;
    isTimerPaused: boolean;
    timeRemaining: number;
    isTimerDone: boolean;
    hintPoints: number;
    hintsUsed: number;
}

export type GameStateType = BaseGameStateType & {
    validWordsMap: ValidWordsMap;
}

export type GameStateSaveType = BaseGameStateType & {
    validWordsMap: (number | [string, WordSubset][])[][];
}