import React from "react";
import styles from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <header className={styles.header}>
        <h1 className={styles.heading}>
          Welcome to Resume Shaper College Admin
        </h1>
      </header>
      <main>
        <p>
          Manage student resumes efficiently with Resume Shaper College Admin
          app. Streamline the process of collecting, reviewing, and updating
          student resumes.
        </p>
      </main>
    </div>
  );
};

export default Welcome;
