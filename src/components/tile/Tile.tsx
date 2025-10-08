import { TILE_VALUE_COLOURS } from "../../constants/dice";
import styles from "./Tile.module.css";

const Tile = ({ key, tile }) => {
    return (
        <span
            className={styles.tile}
            style={{ backgroundColor: TILE_VALUE_COLOURS[tile.value] }}
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
        </span>
    )
};

export default Tile;