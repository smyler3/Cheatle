declare global {
    type positionValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    
    type tileValue = 1 | 2 | 3 | 4 | 5;

    type Tile = {
        text: string,
        value: tileValue,
    }
}
