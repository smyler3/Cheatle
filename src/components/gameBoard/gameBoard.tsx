import styles from "./GameBoard.module.css";

const GameBoard = ({ children }) => {
    return (
        <div
            className={styles.board}
        >
            {children}
        </div>
    )
};

export default GameBoard;