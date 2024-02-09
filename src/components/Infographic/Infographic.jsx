import React from "react";
import styles from "./Infographic.module.css";
import {
  ArrowDown,
  ArrowUp,
  BarChart,
  NotepadText,
  UserIcon,
  UsersIcon,
} from "lucide-react";

const Infographic = ({ title, count, type, percentage, positive }) => {
  return (
    <div className={styles.infoBox}>
      <div className={styles.upperRegion}>
        <div className={styles.countSection}>
          <p>{title.toUpperCase()}</p>
          <p>{count}</p>
        </div>
        <div
          className={`${styles.icon} ${
            type === "1"
              ? styles.firstColor
              : type === "2"
              ? styles.secondColor
              : type === "3"
              ? styles.thirdColor
              : styles.fourthColor
          }`}
        >
          {type === "1" && <UsersIcon />}
          {type === "2" && <UserIcon />}
          {type === "3" && <NotepadText />}
          {type === "4" && <BarChart />}
        </div>
      </div>
      <div className={styles.lowerRegion}>
        <div
          className={`${styles.percentage} ${
            positive ? styles.positive : styles.negative
          }`}
        >
          {positive === true ? <ArrowUp /> : <ArrowDown />}
          {percentage}%
        </div>
        <div>Since last week</div>
      </div>
    </div>
  );
};

export default Infographic;
