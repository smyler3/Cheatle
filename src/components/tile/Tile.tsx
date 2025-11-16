
import { TILE_VALUE_COLOURS } from "../../constants";
import type { TileType } from "../../schema/CheatleSchema";
import styles from "./Tile.module.css";

type TileProps = {
    tile: TileType,
    position: number,
    handleClick: (tile: TileType, position: number) => void;
};

const Tile = ({ 
    tile, 
    position, 
    handleClick
}: TileProps) => {
    return (
        <button
            className={styles.tile}
            style={{ backgroundColor: TILE_VALUE_COLOURS[tile.value] }}
            onClick={() => handleClick(tile, position)}
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