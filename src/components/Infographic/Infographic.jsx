import React from "react";
import styles from "./Infographic.module.css";
import { ArrowDown, ArrowUp, UsersRoundIcon } from "lucide-react";

const Infographic = ({ title, count, percentage, positive }) => {
  return (
    <div className={styles.infoBox}>
      <div className={styles.upperRegion}>
        <div>
          <p>{title.toUpperCase()}</p>
          <p>{count}</p>
        </div>
        <div className={styles.icon}>
          <UsersRoundIcon />
        </div>
      </div>
      <div className={styles.lowerRegion}>
        <div className={styles.percentage}>
          {positive === true ? <ArrowUp /> : <ArrowDown />}
          {percentage}%
        </div>
        <div>Since last week</div>
      </div>
    </div>
  );
};

export default Infographic;
