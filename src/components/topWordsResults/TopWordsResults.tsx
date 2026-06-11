import { useFetchedData } from "../../hooks/fetchedData/useFetchedData";
import { useGameState } from "../../hooks/gameState/useGameState";
import type { WordSubset } from "../../types/types";
import styles from "./TopWordsResults.module.css";

type TopWordsResultsProps = {
    shouldHideSpoilers: boolean;
};

export default function TopWordsResults({ shouldHideSpoilers }: TopWordsResultsProps) {
    const { minTopWordValue } = useFetchedData();
    const { validWordsMap } = useGameState();

    // Only looks at words which can be a top x word
    const topWordHints = new Map([...validWordsMap.entries()].filter(([key]) => Number(key) >= minTopWordValue));
    
    return (
        <div className={styles.topWords}>
            {Array.from(topWordHints.entries()).map(([valueStr, words]) => {
                const value = Number(valueStr);

                return (
                    <section key={value} className={styles.pointsSection}>
                        <p className={styles.pointSectionHeader}>{value} points</p>
                        <ol className={styles.wordList}>
                            {Array.from(words.entries()).map(([text, hint]: [text: string, wordSubset: WordSubset]) => {
                                const { revealedText, isGuessed: wasGuessed } = hint;

                                return (
                                    <li key={text} className={`${wasGuessed && styles.guessed}`}>
                                        {shouldHideSpoilers 
                                            ? "..." 
                                            : (
                                                <>
                                                <span className={styles.hintText}>{revealedText}</span>
                                                <span>{text.replace(revealedText, '')}</span>
                                                </>
                                            )
                                        }
                                    </li>
                                )
                            })}
                        </ol>
                    </section>
                )
            })}
        </div>
    )
}