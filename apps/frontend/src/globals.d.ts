export {};

declare global {
    type TileValue = 1 | 2 | 3 | 4 | 5;

    type Tile = {
        text: string,
        value: tileValue,
    }

    type Word = {
        text: string,
        value: number,
    }
}
