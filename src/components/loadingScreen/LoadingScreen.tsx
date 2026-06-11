import styles from "./LoadingScreen.module.css";

const order = [0, 1, 2, 5, 4, 3, 6, 7, 8];

const colors = [
  "var(--grey-700)", "var(--blue-100)", "var(--grey-700)",
  "var(--grey-700)", "var(--grey-700)", "var(--green-100)",
  "var(--purple-100)", "var(--green-100)", "var(--red-100)",
];

const LoadingScreen = () => {
  return (
    <main className={styles.loadingMain}>
      <div className={styles.spinner}>
        {Array.from({ length: 9 }).map((_, i) => {
          const seqIndex = order.indexOf(i);

          return (
            <div
              key={i}
              className={styles.cell}
              style={{
                "--i": seqIndex,
                "--c": colors[i],
                "--rev": 8 - seqIndex,
              } as React.CSSProperties}
            />
          );
        })}
      </div>
      <div className={styles.loadingContainer}>
        <h2>Loading</h2>

        <span className={styles.loadingDot} style={{ animationDelay: "0s" }}>.</span>
        <span className={styles.loadingDot} style={{ animationDelay: "0.1s" }}>.</span>
        <span className={styles.loadingDot} style={{ animationDelay: "0.2s" }}>.</span>
      </div>
    </main>
  );
};

export default LoadingScreen;