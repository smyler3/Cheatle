import { useEffect, useState } from "react";
import { useHints } from "../../hooks/hints/useHints";
import { useModal } from "../../hooks/modal/useModal";
import styles from "./HintButton.module.css";
import { useGameData } from "../../hooks/gameData/useGameData";
import { HINT_POINTS_REQUIRED } from "../../constants";

type indicatorType = {
    id: string, 
    value: number
};

const HintButton = () => {
  const { hintPoints } = useHints();
  const { openHintModal } = useModal();
  const { correctGuesses } = useGameData();

  const [oldHintPoints, setOldHintPoints] = useState(0);
  const [indicators, setIndicators] = useState<indicatorType[]>([]);

  useEffect(() => {
    const diff = hintPoints - oldHintPoints;
    if (diff <= 0) return;

    setIndicators((prev) => [
      ...prev,
      {
        id: `indicator-${correctGuesses.length}`,
        value: diff,
      },
    ]);

    setOldHintPoints(hintPoints);
  }, [hintPoints, correctGuesses, oldHintPoints]);

  const handleAnimationEnd = (id: string) => {
    setIndicators((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <button
      id="hintButton"
      className={styles.button}
      onClick={openHintModal}
    >
      <span className={styles.buttonText}>HINT</span>

      {indicators.map(({ id, value }) => (
        <span
          key={id}
          className={styles.scoreIncreaseIndicator}
          onAnimationEnd={() => handleAnimationEnd(id)}
        >
          +{value}
        </span>
      ))}

      <span
        className={`${styles.hintProgressIndicator} ${hintPoints >= HINT_POINTS_REQUIRED && styles.full}`}
        style={{
          width: `calc(${Math.min(1.2, hintPoints / HINT_POINTS_REQUIRED) * 100}% + 20px)`,
          transitionDuration: `${Math.min(1, hintPoints / HINT_POINTS_REQUIRED) * 1.5}s`,
        }}
      />
    </button>
  );
};

export default HintButton;