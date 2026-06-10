import { useFetchedData } from "../../hooks/fetchedData/useFetchedData";
import { useGameState } from "../../hooks/gameState/useGameState";
import styles from "./GuessList.module.css";
import starIcon from "/starIcon.svg";

type GuessListProps = {
    shouldShowScore: boolean,
};

const GuessList = ({ shouldShowScore }: GuessListProps) => {
    const { maxPossibleScore, minTopWordValue } = useFetchedData();
    const { validWordsMap, score } = useGameState();
    
    const guessedWords = [];

    // Get all guessedWords
    for (const [value, words] of validWordsMap.entries()) {
        for (const [text, subset] of words.entries()) {
            if (subset.isGuessed) {
                guessedWords.push({ text: text, value: value})
            }
        }
    };

    return (
        <div>
            {shouldShowScore && 
                <div 
                    className={styles.listHeading}
                >
                    <p>Your guesses</p>
                    <p>{score}/{maxPossibleScore}</p>
                </div>
            }
            <ol className={styles.wordList}>
                {/* Need to create an array by going through validWordsMap and finding all isGuessed words then using that */}
                {guessedWords.map(guess => {
                        return (
                            <li 
                                key={guess.text}
                                className={styles.guess}
                            >
                                <p
                                    className={styles.word}
                                >
                                    {guess.text}
                                    {guess.value >= minTopWordValue && <img src={starIcon} className={styles.star} />}
                                </p>
                                <p
                                    className={styles.score}
                                >
                                    {guess.value}
                                </p>
                            </li>
                        )
                    })}
            </ol>
        </div>
    )
};

export default GuessList;