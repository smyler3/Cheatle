import { useFetchedData } from "../../hooks/fetchedData/useFetchedData";
import { useGameState } from "../../hooks/gameState/useGameState";
import styles from "./AllWordsResults.module.css";

type AllWordsResultsProps = {
    shouldHideSpoilers: boolean;
};

export default function AllWordsResults({ shouldHideSpoilers }: AllWordsResultsProps) {
  const { validWords } = useFetchedData();
  const { validWordsMap } = useGameState();
  const groupedWordsByLength = new Map();

  for (const [, words] of validWordsMap.entries()) {
    for (const [text, subset] of words.entries()) {
      const textLength = text.length;
      const isGuessed = subset.isGuessed;

      if (!groupedWordsByLength.has(textLength)) {
        groupedWordsByLength.set(textLength, {
          words: new Map(),
          guessedCount: 0
        });
      }
        
      groupedWordsByLength.get(textLength).words.set(text, isGuessed);

      if (isGuessed) {
        groupedWordsByLength.get(textLength).guessedCount += 1;
      }
    };
  };

  const sortedWordsByLength = new Map([...groupedWordsByLength.entries()].sort(([a], [b]) => b - a));
  const totalGuessedCount = [...groupedWordsByLength.values()].reduce((total, group) => total + group.guessedCount, 0);

  return (
    <div className={styles.allWords}>
      {[...sortedWordsByLength].map(([length, data]) => {
        const sectionWordCount = data.words.size;
        const guessCount = data.guessedCount;

        return (
          <section key={length} className={styles.pointsSection}>
            <p className={styles.pointSectionHeader}>
              {length} letters ({guessCount}/{sectionWordCount})
            </p>
            <ul className={styles.wordList}>
              {[...data.words].map(([text, isGuessed]) => {
                return (
                  <li key={text} className={`${isGuessed ? styles.guessed : ""}`}>
                    {shouldHideSpoilers ? "..." : text}
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
