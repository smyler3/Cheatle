import type { Guess } from "../../types/types";
import styles from "./GuessList.module.css";

type GuessListProps = {
    guesses: Guess[],
    score?: number,
};

const GuessList = ({ guesses, score }: GuessListProps) => {
    return (
        <div>
            {score && 
                <div 
                    className={styles.listHeading}
                >
                    <p>Your guesses</p>
                    <p>{score}/54</p>
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