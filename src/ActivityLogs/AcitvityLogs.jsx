import React from "react";
import DynamicTableComponent from "../components/Table/DynamicTable";
import { activities, convertedArrayOfActivities } from "./dummyactivities";
import styles from "./ActivityLogs.module.css";

const AcitvityLogs = () => {
  return (
    <div className={styles.log}>
      <h2>Actvity Logs</h2>
      <DynamicTableComponent data={convertedArrayOfActivities} />
    </div>
  );
};

export default AcitvityLogs;
