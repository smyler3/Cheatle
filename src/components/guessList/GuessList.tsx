import styles from "./GuessList.module.css";

type GuessListProps = {
    guesses: Word[],
    score: number,
};

const GuessList = ({ guesses, score }: GuessListProps) => {
    return (
        <div>
            <div 
                className={styles.listHeading}
            >
                <p>Your guesses</p>
                <p>{score}/54</p>
            </div>
            <ol className={styles.wordList}>
                {guesses.map((guess, index) => {
                        return (
                            <li 
                                key={index}
                                className={styles.guess}
                            >
                                <p
                                    className={styles.word}
                                >
                                    {guess.text}
                                    {index === 0 && <img src="/starIcon.svg" className={styles.star} />}
                                    {index === 1 && <img src="/halfStarIcon.svg" className={styles.star} />}
                                    {index === 2 && <img src="/halfStarIcon.svg" className={styles.star} />}
                                </p>
                                <p
                                    className={styles.score}
                                >{guess.value}</p>
                            </li>
                        )
                    })}
            </ol>
        </div>
    )
};

export default GuessList;