import styles from "./ActionButtons.module.css";

const ActionButtons = () => {

    return (
        <div
            className={styles.actionButtons}
        >
            <button
                className={styles.hintButton}
            >
                <span 
                    className={styles.hintProgressIndicator}
                    style={{ width: '100px' }}
                ></span>
                Hint
            </button>
            <button
                className={styles.button}
            >
                Finish
            </button>
        </div>
    )
};

export default ActionButtons;