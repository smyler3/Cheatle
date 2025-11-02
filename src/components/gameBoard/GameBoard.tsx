import type { ReactNode } from "react";
import styles from "./GameBoard.module.css";

type GameBoardProps = {
    children: ReactNode,
};

const GameBoard = ({ children }: GameBoardProps) => {
    return (
        <div
            className={styles.board}
        >
            {children}
        </div>
    )
};

export default GameBoard;