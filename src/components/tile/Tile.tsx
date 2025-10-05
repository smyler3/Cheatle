import styles from "./Tile.module.css";

const Tile = ({ key, tile }) => {
    return (
        <span
            className={styles.tile}
            style={{ backgroundColor: 'var(--purple)' }}
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