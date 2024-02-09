import React, { useState } from "react";
import styles from "./ResumeUsageAnalytics.module.css";
import { jobTitlesInfo } from "./ResumeData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { uniqueActivityTypesAndCounts } from "./ActivityData";
import BarChart from "../components/BarChart/BarChart";
import LineChart from "../components/LineChart/LineChart";
import DynamicTableComponent from "../components/Table/DynamicTable";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const barlabels = jobTitlesInfo.map((jobTitle) => jobTitle.jobTitle);
const linelabels = uniqueActivityTypesAndCounts.map(
  (uniqueActivity) => uniqueActivity.activity
);
const jobTitleCount = jobTitlesInfo.map((jobTitle) => jobTitle.count);

const uniqueActivityCount = uniqueActivityTypesAndCounts.map(
  (uniqueActivity) => uniqueActivity.occurrences
);

const ResumeUsageAnalytics = () => {
  const [timeFilter, setTimeFilter] = useState();
  return (
    <main>
      <Navbar />
      <div className={styles.resumeanalytics}>
        <Sidebar />
        <div className={styles.resumeusage}>
          <h3>Resume Usage Analytics</h3>
          <div className={styles.topContainer}>
            <h3>Resumes with respective Job Titles</h3>
            <BarChart
              xTitle="Job Titles"
              yTitle="Number of Resumes"
              labels={barlabels}
              count={jobTitleCount}
            />
          </div>
          <div className={styles.middleContainer}>
            <h3>Activities</h3>
            <div className={styles.activityData}>
              <div className={styles.chart}>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.button}
                    onClick={() => setTimeFilter("24hours")}
                  >
                    24 hours
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => setTimeFilter("lastweek")}
                  >
                    Last Week
                  </button>
                  <button
                    className={styles.button}
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
                    (a, b) => b.count - a.count
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

export default ResumeUsageAnalytics;
