import { useState } from "react";
import styles from "./progress.module.scss";

export default function Progress({ progreso }) {
  return (
    <div className={styles.progressBarContainer}>
      <progress value={progreso} max="100"></progress>
    </div>
  );
}
