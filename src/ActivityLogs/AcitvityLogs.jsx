import React, { useEffect, useState } from "react";
import DynamicTableComponent from "../components/Table/DynamicTable";
import { activities, convertedArrayOfActivities } from "./dummyactivities";
import styles from "./ActivityLogs.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import LineChart from "../components/LineChart/LineChart";
import { uniqueActivityTypesAndCounts } from "./ActivityData";

const AcitvityLogs = () => {
  const [timeFilter, setTimeFilter] = useState();
  const [activeOne, setActiveOne] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(true);

  useEffect(() => {
    if (timeFilter === "24hours") {
      setActiveOne(true);
      setActiveTwo(false);
      setActiveThree(false);
    } else if (timeFilter === "lastweek") {
      setActiveOne(false);
      setActiveTwo(true);
      setActiveThree(false);
    } else if (timeFilter === "lastmonth") {
      setActiveOne(false);
      setActiveTwo(false);
      setActiveThree(true);
    }
  }, [timeFilter]);

  const linelabels = uniqueActivityTypesAndCounts.map(
    (uniqueActivity) => uniqueActivity.activity
  );

  const uniqueActivityCount = uniqueActivityTypesAndCounts.map(
    (uniqueActivity) => uniqueActivity.occurrences
  );

  return (
    <main>
      <Navbar />
      <div className={styles.acitvityLogs}>
        <Sidebar />
        <div className={styles.log}>
          <h2>Actvity Logs</h2>
          <DynamicTableComponent data={convertedArrayOfActivities} />
          <div className={styles.middleContainer}>
            <h3>Activities</h3>
            <div className={styles.activityData}>
              <div className={styles.chart}>
                <div className={styles.buttonContainer}>
                  <button
                    className={`${styles.button} ${activeOne && styles.active}`}
                    onClick={() => setTimeFilter("24hours")}
                  >
                    24 hours
                  </button>
                  <button
                    className={`${styles.button} ${activeTwo && styles.active}`}
                    onClick={() => setTimeFilter("lastweek")}
                  >
                    Last Week
                  </button>
                  <button
                    className={`${styles.button} ${
                      activeThree && styles.active
                    }`}
                    onClick={() => setTimeFilter("lastmonth")}
                  >
                    Last Month
                  </button>
                </div>
                <LineChart
                  xTitle="Activities"
                  yTitle="Number of Students"
                  labels={linelabels}
                  count={uniqueActivityCount}
                />
              </div>
              <div className={styles.bottomContainer}>
                <DynamicTableComponent
                  data={uniqueActivityTypesAndCounts.sort(
                    (a, b) => b.occurrences - a.occurrences
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AcitvityLogs;
