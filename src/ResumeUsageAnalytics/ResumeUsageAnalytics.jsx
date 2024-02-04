import React from "react";
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
  return (
    <div className={styles.resumeusage}>
      <BarChart labels={barlabels} count={jobTitleCount} />
      <LineChart labels={linelabels} count={uniqueActivityCount} />
      <DynamicTableComponent data={uniqueActivityTypesAndCounts} />
    </div>
  );
};

export default ResumeUsageAnalytics;
