import { useModal } from "../../hooks/modal/useModal";
import styles from "./ResultsButton.module.css";

const ResultsButton = () => {
  const { openResultModal } = useModal();

  return (
    <button className={styles.button} onClick={openResultModal}>
      RESULTS
    </button>
  );
};

export default ResultsButton;
