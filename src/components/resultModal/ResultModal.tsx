import { useState } from "react";
import { HINT_POINTS_REQUIRED } from "../../constants";
import { useModal } from "../../hooks/modal/useModal";
import styles from "./ResultModal.module.css";
import closeIcon from "/closeIcon.svg";
import hideIcon from "/hideIcon.svg";
import showIcon from "/showIcon.svg";
import { useGameState } from "../../hooks/gameState/useGameState";
import TopWordsResults from "../topWordsResults/TopWordsResults";
import AllWordsResults from "../allWordsResults/AllWordsResults";
import { useFetchedData } from "../../hooks/fetchedData/useFetchedData";

interface ResultModalProps {
  backgroundRef: React.RefObject<HTMLDivElement | null>;
}

export default function ResultModal({ backgroundRef }: ResultModalProps) {
  const { maxPossibleScore } = useFetchedData();
  const { score, minutesUsed, secondsUsed, hintsUsed, hintPoints } =
    useGameState();
  const { closeModal } = useModal();

  const [shouldHideSpoilers, setShouldHideSpoilers] = useState(false);
  const [shouldShowTopWords, setShouldShowTopWords] = useState(true);

  if (backgroundRef.current) {
    backgroundRef.current.style.backgroundColor = shouldHideSpoilers
      ? "#000000AA"
      : "#00000025";
    backgroundRef.current.style.backdropFilter = shouldHideSpoilers
      ? "blur(10px)"
      : "blur(0)";
  }

  return (
    <>
      <button className={styles.closeButton} onClick={closeModal}>
        <img src={closeIcon} alt="Close Icon" />
      </button>
      <div className={styles.resultModal}>
        <h2 className={styles.modalHeading}>Results</h2>
        <div className={styles.statsContainer}>
          <span className={styles.statContainer}>
            <div className={styles.stat}>
              {score} / {maxPossibleScore}
            </div>
            <p className={styles.statDescription}>Score</p>
          </span>
          <span className={styles.statContainer}>
            <div className={styles.stat}>
              {minutesUsed}:{secondsUsed}
            </div>
            <p className={styles.statDescription}>Time</p>
          </span>
          <span className={styles.statContainer}>
            <div className={styles.stat}>
              {hintsUsed} /{" "}
              {hintsUsed + Math.floor(hintPoints / HINT_POINTS_REQUIRED)}
            </div>
            <p className={styles.statDescription}>Hints</p>
          </span>
        </div>
        <button
          className={styles.toggleSpoilersButton}
          onClick={() => setShouldHideSpoilers((prev) => !prev)}
        >
          <img
            src={shouldHideSpoilers ? showIcon : hideIcon}
            alt={
              shouldHideSpoilers ? "Show spoilers icon" : "Hide spoilers icon"
            }
          />
          <p>{shouldHideSpoilers ? "Show Spoilers" : "Hide Spoilers"}</p>
        </button>
        <div
          className={`${styles.resultsTabContainer} ${shouldShowTopWords ? styles.left : styles.right}`}
        >
          <button
            className={`${styles.resultsTab} ${shouldShowTopWords && styles.activeTab}`}
            onClick={() => setShouldShowTopWords(true)}
          >
            Top 5
          </button>
          <button
            className={`${styles.resultsTab} ${!shouldShowTopWords && styles.activeTab}`}
            onClick={() => setShouldShowTopWords(false)}
          >
            All
          </button>
        </div>
        {shouldShowTopWords ? (
          <TopWordsResults shouldHideSpoilers={shouldHideSpoilers} />
        ) : (
          <AllWordsResults shouldHideSpoilers={shouldHideSpoilers} />
        )}
        <button className={styles.cancelButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </>
  );
}
