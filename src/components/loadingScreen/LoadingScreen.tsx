import styles from "./LoadingScreen.module.css";

const LoadingScreen = () => {
    return (
        <main className={styles.loadingMain}>
            <div className={styles.loadingContainer} >
                <h2>Loading</h2>
                <span 
                    className={styles.loadingDot}
                    style={{
                        animationDelay: `0s`,
                    }}
                >.</span>
                <span 
                    className={styles.loadingDot}
                    style={{
                        animationDelay: `0.1s`,
                    }}
                >.</span>
                <span 
                    className={styles.loadingDot}
                    style={{
                        animationDelay: `0.2s`,
                    }}
                >.</span>
            </div>
        </main>
    );
};

export default LoadingScreen;