import styles from "./HintButton.module.css";

const HintButton = () => {

    return (
        <button
            className={styles.button}
        >
            <span 
                className={styles.hintProgressIndicator}
                style={{ width: '100px' }}
            ></span>
            <span 
                className={styles.scoreIncreaseIndicator}
            >
                +1
            </span>
            Hint
        </button>
    )
};

export default HintButton;