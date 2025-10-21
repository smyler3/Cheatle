import { memo, type ReactNode } from "react";
import HintButton from "../hintButton/HintButton";
import SubmitButton from "../submitButton/SubmitButton";
import styles from "./ActionButtons.module.css";

type ActionButtonsProps = {
    children: ReactNode,
};

const ActionButtons = memo(({ children }: ActionButtonsProps) => (
  <div className={styles.actionButtons}>
    {children}
  </div>
));

export default ActionButtons;