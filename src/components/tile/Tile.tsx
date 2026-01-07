import { TILE_VALUE_COLOURS } from "../../constants";
import type { TileType } from "../../schema/CheatleSchema";
import styles from "./Tile.module.css";
import type { LastGuessType } from "../../types/types";

const getAnimationClass = (
    position: number,
    lastGuess: LastGuessType,
    styles: Record<string, string>
): string => {
    if (lastGuess.result === 'idle') {
        return '';
    }

    return lastGuess.tilePositions.includes(position)
        ? styles[`${lastGuess.result}Guess`]
        : '';
};

const getAnimationDelay = (
    position: number,
    lastGuess: LastGuessType
): string => {
    if (lastGuess.result !== 'correct') {
        return '0s';
    }

    const index = lastGuess.tilePositions.indexOf(position);
    return index === -1 ? '0s' : `${index * 0.06}s`;
};

const isLastTileAnimated = (
    position: number,
    lastGuess: LastGuessType
): boolean => {
    return lastGuess.result !== 'idle' && lastGuess.tilePositions.at(-1) === position;
}

type TileProps = {
    tile: TileType,
    position: number,
    lastGuess: LastGuessType,
    clearLastGuess: () => void;
    selectedTiles: boolean[],
    handleClick: (tile: TileType, position: number) => void;
};

const Tile = ({ 
    tile, 
    position, 
    lastGuess,
    clearLastGuess,
    selectedTiles,
    handleClick
}: TileProps) => {
    const selectedValue = selectedTiles[position] ? "selected" : "default";

    const animationClass = getAnimationClass(position, lastGuess, styles);
    const animationDelay = getAnimationDelay(position, lastGuess);
    const shouldClear = isLastTileAnimated(position, lastGuess);

    return (
        <button
            id={`title-${position}`}
            className={`${styles.tile} ${animationClass}`}
            style={{
                backgroundColor: TILE_VALUE_COLOURS[tile.value][selectedValue],
                animationDelay,
            }}
            onClick={() => handleClick(tile, position)}
            onAnimationEnd={() => shouldClear && clearLastGuess()}
        >
            <div
                className={styles.text}
            >
                {tile.text}
            </div>
            <div
                className={styles.value}
            >
                {tile.value}
            </div>
        </button>
    )
};

export default Tile;