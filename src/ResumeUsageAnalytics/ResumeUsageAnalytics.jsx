import React from "react";
import styles from "./ResumeUsageAnalytics.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BarChart from "../components/BarChart/BarChart";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { jobTitlesInfo } from "../dummyData/ResumeData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const jobTitleCount = jobTitlesInfo.map((jobTitle) => jobTitle.count);
const barlabels = jobTitlesInfo.map((jobTitle) => jobTitle.jobTitle);

const ResumeUsageAnalytics = () => {
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
        </div>
      </div>
    </main>
  );
};

export default ResumeUsageAnalytics;
