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
    <div className={styles.resumeusage}>
      <BarChart labels={barlabels} count={jobTitleCount} />
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
          onClick={() => setTimeFilter("lastmonth")}
        >
          Last Month
        </button>
      </div>

      <LineChart labels={linelabels} count={uniqueActivityCount} />
      <h3>Activity Table</h3>
      <DynamicTableComponent data={uniqueActivityTypesAndCounts} />
    </div>
  );
};

export default ResumeUsageAnalytics;
