import { GUESS_ERRORS } from "../../constants";
import type { GuessErrorsType, StateSetter } from "../../types/types";
import styles from "./IncorrectDetailsBanner.module.css";

interface IncorrectDetailsBannerProps {
    showType: GuessErrorsType | null,
    setShowType: StateSetter<GuessErrorsType | null>,
};

const ErrorTextMap: Record<GuessErrorsType, string> = {
    [GUESS_ERRORS.DUPLICATE]: "Duplicate Guess",
    [GUESS_ERRORS.TOO_SMALL]: "Under min length",
};

const IncorrectDetailsBanner = ({ showType, setShowType }: IncorrectDetailsBannerProps) => {
    if (showType === null) {
        return
    }

    const bannerText = ErrorTextMap[showType];

    return (
        <div 
            className={`${styles.incorrectBannerContainer} ${styles.visible}`}
            onAnimationEnd={() => setShowType(null)}    
        >
            {bannerText}
        </div>
    );
};

export default IncorrectDetailsBanner;