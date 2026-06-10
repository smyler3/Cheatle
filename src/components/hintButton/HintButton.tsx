import { useEffect, useState } from "react";
import { useModal } from "../../hooks/modal/useModal";
import styles from "./HintButton.module.css";
import { HINT_POINTS_REQUIRED } from "../../constants";
import { useGameState } from "../../hooks/gameState/useGameState";

type indicatorType = {
    id: string, 
    value: number
};

const HintButton = () => {
  // Need to start using some internal state instead? Otherwise useGuesses might need to keep some state on each guess?
  const { correctGuessCount, hintPoints } = useGameState();
  const { openHintModal } = useModal();

  const [oldHintPoints, setOldHintPoints] = useState(0);
  const [indicators, setIndicators] = useState<indicatorType[]>([]);

  const numberOfHints = Math.floor(hintPoints / HINT_POINTS_REQUIRED);

  useEffect(() => {
    const diff = hintPoints - oldHintPoints;
    if (diff <= 0) return;

    setIndicators((prev) => [
      ...prev,
      {
        id: `indicator-${correctGuessCount}`,
        value: diff,
      },
    ]);

    setOldHintPoints(hintPoints);
  }, [hintPoints, correctGuessCount, oldHintPoints]);

  const handleAnimationEnd = (id: string) => {
    setIndicators((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <button
      id="hintButton"
      className={styles.button}
      onClick={openHintModal}
    >
      <div className={styles.contentWrapper}>
            <span className={styles.buttonText}>HINT</span>
            <span
                className={styles.numberOfHintsIndicator}
            >
                {Array.from({ length: numberOfHints }, (_, index) => (
                    <span key={index} className={styles.dotIndicator}></span>
                ))}
            </span>
      </div>

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