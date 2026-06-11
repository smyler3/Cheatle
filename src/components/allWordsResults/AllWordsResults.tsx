import { useFetchedData } from "../../hooks/fetchedData/useFetchedData";
import { useGameState } from "../../hooks/gameState/useGameState";
import styles from "./AllWordsResults.module.css";

export default function AllWordsResults() {
  const { validWords } = useFetchedData();
  const { validWordsMap } = useGameState();
  let totalGuessedCount = 0;

  // Collect all guessed words
  for (const [, words] of validWordsMap.entries()) {
    for (const [, subset] of words.entries()) {
      if (subset.isGuessed) {
        totalGuessedCount += 1;
      }
    }
  }

  return (
    <div className={styles.allWords}>
      {Array.from(validWordsMap.entries()).map(([value, words]) => {
        const wordsArray = Array.from(words.entries());
        const guessCount = wordsArray.reduce(
          (guessedWords, [, subset]) =>
            guessedWords + (subset.isGuessed ? 1 : 0),
          0,
        );

        return (
          <section className={styles.pointsSection}>
            <p className={styles.pointSectionHeader}>
              {value} points ({guessCount}/{wordsArray.length})
            </p>
            <ul className={styles.wordList}>
              {wordsArray.map(([text, subset]) => {
                return (
                  <li className={`${subset.isGuessed && styles.guessed}`}>
                    {text}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
      <p className={styles.totalCount}>
        <span className={styles.totalValues}>({totalGuessedCount} / {validWords.length})</span>
      </p>
    </div>
  );
}
