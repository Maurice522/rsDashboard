import React from "react";
import DynamicTableComponent from "../components/Table/DynamicTable";
import { activities, convertedArrayOfActivities } from "./dummyactivities";
import styles from "./ActivityLogs.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const AcitvityLogs = () => {
  return (
    <>
      <Navbar />
      <div className={styles.acitvityLogs}>
        <Sidebar />
        <div className={styles.log}>
          <h2>Actvity Logs</h2>
          <DynamicTableComponent data={convertedArrayOfActivities} />
        </div>
      </div>
    </>
  );
};

export default AcitvityLogs;
