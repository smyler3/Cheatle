import { useEffect, useState } from "react";
import { useHints } from "../../hooks/hints/useHints";
import { useModal } from "../../hooks/modal/useModal";
import styles from "./HintButton.module.css";
import { useGameData } from "../../hooks/gameData/useGameData";

const POINTS_FOR_HINT = 25;

const HintButton = () => {
    const { hintPoints } = useHints();
    const { openHintModal } = useModal();
    const { correctGuesses } = useGameData();

    const [oldHintPoints, setOldHintPoints] = useState(0);

    useEffect(() => {
        const pointDifference = hintPoints - oldHintPoints;
        const wordsGuessed = correctGuesses.length;

        const hintButton = document.getElementById("hintButton");
        console.log("btn", hintButton);

        const pointsIndicator = document.createElement("span");
        pointsIndicator.setAttribute("id", `point-indicator-${wordsGuessed - 1}`);
        pointsIndicator.classList.add(`${styles.scoreIncreaseIndicator}`)
        pointsIndicator.textContent = `+${pointDifference}`;

        hintButton?.appendChild(pointsIndicator);

        const timer = setTimeout(() => {
            pointsIndicator.remove();
        }, 2000);

        setOldHintPoints(hintPoints);

        return () => clearTimeout(timer);
    }, [hintPoints]);

    return (
        <button
            className={styles.button}
            onClick={openHintModal}
            id="hintButton"
        >
            <span className={styles.buttonText}>Hint</span>
            <span 
                className={styles.hintProgressIndicator}
                style={{ 
                    width: `calc(${Math.min(1, hintPoints / POINTS_FOR_HINT) * 100}% + 20px)`, 
                    transitionDuration: `${Math.min(Math.min(1, hintPoints / POINTS_FOR_HINT)) * 1.5}s`
                }}
            ></span>
            {/* <span 
                className={styles.scoreIncreaseIndicator}
            >
                +1
            </span> */}
        </button>
    )
};

export default HintButton;