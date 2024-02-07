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
import { Bar, Line } from "react-chartjs-2";
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
  (uniqueActivity) => uniqueActivity.activityType
);
const jobTitleCount = jobTitlesInfo.map((jobTitle) => jobTitle.count);
const uniqueActivityCount = uniqueActivityTypesAndCounts.map(
  (uniqueActivity) => uniqueActivity.count
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
            <BarChart labels={barlabels} count={jobTitleCount} />
          </div>
          <div className={styles.buttonContainer}>
            {" "}
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
          <div className={styles.middleContainer}>
            <h3>Resumes with respective Job Titles</h3>
            <LineChart labels={linelabels} count={uniqueActivityCount} />
          </div>
          <div className={styles.bottomContainer}>
            <h3>Actvities Analytics</h3>
            <DynamicTableComponent
              data={uniqueActivityTypesAndCounts.sort(
                (a, b) => b.count - a.count
              )}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResumeUsageAnalytics;
