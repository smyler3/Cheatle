import styles from "./GuessList.module.css";

const GuessList = ({ guesses }) => {
    const top5 = guesses.slice(0, 5);
    const rest = guesses.slice(5);

    return (
        <div>
            <div 
                className={styles.listHeading}
            >
                <p>Your guesses</p>
                <p>0/54</p>
            </div>
            <ol className={styles.wordList}>
                {guesses.map((guess, index) => {
                        return (
                            <li 
                                id={index}
                                className={styles.guess}
                            >
                                <p
                                    className={styles.word}
                                >
                                    {guess.word}
                                    {index === 0 && <img src="/starIcon.svg" className={styles.star} />}
                                    {index === 1 && <img src="/halfStarIcon.svg" className={styles.star} />}
                                    {index === 2 && <img src="/halfStarIcon.svg" className={styles.star} />}
                                </p>
                                <p
                                    className={styles.score}
                                >{guess.score}</p>
                            </li>
                        )
                    })}
            </ol>
            {/* <div
                className={styles.guessLists}
            >
                <ol className={styles.top5List}>
                    {top5 && top5.map((guess, index) => {
                        return (
                            <li 
                                id={index}
                                className={styles.word}
                            >
                                <p>{guess.word}</p>
                                <p>{guess.score}</p>
                            </li>
                        )
                    })}
                </ol>
                <ol className={styles.restList}>
                    {rest && rest.map((guess, index) => {
                        return (
                            <li 
                                id={index}
                                className={styles.word}
                            >
                                <p>{guess.word}</p>
                                <p>{guess.score}</p>
                            </li>
                        )
                    })}
                </ol>
            </div> */}
        </div>
    )
};

export default GuessList;