import { useGameData } from "../../hooks/gameData/useGameData";
import styles from "./GuessList.module.css";
import starIcon from "/starIcon.svg";

type GuessListProps = {
    shouldShowScore: boolean,
};

const GuessList = ({ shouldShowScore }: GuessListProps) => {
    const { correctGuesses, score, maxPossibleScore } = useGameData();

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
                {correctGuesses.map(guess => {
                        return (
                            <li 
                                key={guess.text}
                                className={styles.guess}
                            >
                                <p
                                    className={styles.word}
                                >
                                    {guess.text}
                                    {guess.isTopWord && <img src={starIcon} className={styles.star} />}
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