import type { StateSetter } from "../../types/types";
import styles from "./DuplicateGuessIndicator.module.css";

interface DuplicateGuessIndicatorProps {
    showDuplicateModal: boolean,
    setShowDuplicateModal: StateSetter<boolean>,
};

const DuplicateGuessIndicator = ({ showDuplicateModal, setShowDuplicateModal }: DuplicateGuessIndicatorProps) => {
    return (
        <div 
            className={`${styles.duplicateGuessContainer} ${showDuplicateModal && styles.visible}`}
            onAnimationEnd={() => setShowDuplicateModal(false)}    
        >
            Duplicate guess
        </div>
    );
};

export default DuplicateGuessIndicator;