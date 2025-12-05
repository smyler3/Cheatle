import type { Word } from "../../schema/CheatleSchema";
import type { Guess } from "../../types/types";
import styles from "./GuessList.module.css";

type GuessListProps = {
    guesses: Guess[],
    shouldShowScore: boolean,
    highestScoringWords?: Word[],
};

const GuessList = ({ guesses, shouldShowScore, highestScoringWords }: GuessListProps) => {
    const topGuesses = guesses.slice(0, 5);
    const score = topGuesses.reduce((score, word) => {
        return score += word.value;
    }, 0);

    const maxPossibleScore = highestScoringWords?.slice(0, 5).reduce((maxScore, word) => {
        return maxScore += word.value;
    }, 0);

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
                {guesses.map(guess => {
                        return (
                            <li 
                                key={guess.text}
                                className={styles.guess}
                            >
                                <p
                                    className={styles.word}
                                >
                                    {guess.text}
                                    {/* TODO: Add half star logic */}
                                    {guess.isTopWord && <img src="/starIcon.svg" className={styles.star} />}
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