import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import {
  last31DaysResumeData,
  last31DaysStudentsData,
} from "../UserManagment/last31DaysData";
import {
  last24HoursResumeData,
  last24HoursStudentsData,
} from "../UserManagment/last24HrsData";
import styles from "./Statistics.module.css";
import LineChart from "../components/LineChart/LineChart";
import { last7DaysResumeData, last7DaysStudentsData } from "./last7DaysData";

const Statistics = () => {
  function getUsersCountByHour(dataArray) {
    console.log(dataArray);
    const currentTimestamp = new Date();
    const hourInMillis = 60 * 60 * 1000;
    const userCountsByHour = Array(24).fill(0);
    dataArray.forEach((user) => {
      const userTimestamp = new Date(user.timestamp.replace(/at/, ""));
      const hoursAgo = Math.floor(
        (currentTimestamp - userTimestamp) / hourInMillis
      );

      if (hoursAgo >= 0 && hoursAgo < 24) {
        userCountsByHour[hoursAgo]++;
      }
    });

    const result = userCountsByHour.map((count, index) => ({
      hour: index,
      count,
    }));
    return result;
  }

  function countObjectsByDate(data) {
    const dateCountMap = {};

    data.forEach((item) => {
      const date = item.timestamp.split(" at ")[0];
      dateCountMap[date] = (dateCountMap[date] || 0) + 1;
    });

    const countArray = Object.keys(dateCountMap).map((date) => ({
      date,
      count: dateCountMap[date],
    }));

    return countArray;
  }

  function getUsersCountByWeek(dataArray) {
    const currentTimestamp = new Date();
    const weekInMillis = 7 * 24 * 60 * 60 * 1000;
    const userCountsByDate = {};

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentTimestamp - i * 24 * 60 * 60 * 1000);
      userCountsByDate[date.toDateString()] = 0;
    }

    dataArray.forEach((user) => {
      const userTimestamp = new Date(user.timestamp.replace(/at/, ""));
      const daysAgo = Math.floor(
        (currentTimestamp - userTimestamp) / (24 * 60 * 60 * 1000)
      );

      if (daysAgo >= 0 && daysAgo < 7) {
        const dateKey = userTimestamp.toDateString();
        userCountsByDate[dateKey]++;
      }
    });

    const result = Object.entries(userCountsByDate).map(([date, count]) => ({
      date,
      count,
    }));
    return result;
  }

  function getResumesCountByWeek(dataArray) {
    const currentTimestamp = new Date();
    const weekInMillis = 7 * 24 * 60 * 60 * 1000;
    const userCountsByDate = {};

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentTimestamp - i * 24 * 60 * 60 * 1000);
      userCountsByDate[date.toDateString()] = 0;
    }

    dataArray.forEach((user) => {
      const userTimestamp = new Date(user.timestamp.replace(/at/, ""));
      const daysAgo = Math.floor(
        (currentTimestamp - userTimestamp) / (24 * 60 * 60 * 1000)
      );

      if (daysAgo >= 0 && daysAgo < 7) {
        const dateKey = userTimestamp.toDateString();
        userCountsByDate[dateKey]++;
      }
    });

    const result = Object.entries(userCountsByDate).map(([date, count]) => ({
      date,
      count,
    }));
    return result;
  }

  const last7DaysStudentsLabels = getUsersCountByWeek(
    last7DaysStudentsData
  ).map((day) => day.date);

  const last7DaysStudents = getUsersCountByWeek(last7DaysStudentsData).map(
    (day) => day.count
  );

  const last7DaysResumesLabels = getResumesCountByWeek(last7DaysResumeData).map(
    (day) => day.date
  );

  const last7DaysResumes = getResumesCountByWeek(last7DaysResumeData).map(
    (day) => day.count
  );

  const last31DaysStudentsLabels = countObjectsByDate(
    last31DaysStudentsData
  ).map((day) => day.date);

  const last31DaysStudents = countObjectsByDate(last31DaysStudentsData).map(
    (day) => day.count
  );

  const last31DaysResumeLabels = countObjectsByDate(last31DaysStudentsData).map(
    (day) => day.date
  );

  const last31DaysResumes = countObjectsByDate(last31DaysResumeData).map(
    (day) => day.count
  );

  const last24HoursStudentsLabels = getUsersCountByHour(
    last24HoursStudentsData
  ).map((data) => data.hour.toString() + " Hours Ago");

  const last24HoursStudents = getUsersCountByHour(last24HoursStudentsData).map(
    (data) => data.count
  );

  const last24HoursResumeLabels = getUsersCountByHour(
    last24HoursResumeData
  ).map((data) => data.hour.toString() + " Hours Ago");

  const last24HoursResumes = getUsersCountByHour(last24HoursResumeData).map(
    (data) => data.count
  );

  const [timeFilterChartOne, setTimeFilterChartOne] = useState("last24Hours");
  const [timeFilterChartTwo, setTimeFilterChartTwo] = useState("last24Hours");

  const [labelsChartOne, setLabelsChartOne] = useState(
    last24HoursStudentsLabels
  );
  const [labelsChartTwo, setLabelsChartTwo] = useState(last24HoursResumeLabels);

  const [countChartOne, setCountChartOne] = useState(last24HoursStudents);
  const [countChartTwo, setCountChartTwo] = useState(last24HoursResumes);
  const [countChartThree, setCountChartThree] = useState(last31DaysResumes);

  const [selectedJob, setSelectedJob] = useState("");

  const jobTitles = last31DaysResumeData.map((resume) => resume.jobTitle);
  const uniqueJobTitles = jobTitles.filter(
    (item, index) => jobTitles.indexOf(item) === index
  );

  useEffect(() => {
    if (timeFilterChartOne === "last24Hours") {
      setLabelsChartOne(last24HoursStudentsLabels);
      setCountChartOne(last24HoursStudents);
    } else if (timeFilterChartOne === "last31Days") {
      setLabelsChartOne(last31DaysStudentsLabels);
      setCountChartOne(last31DaysStudents);
    } else if (timeFilterChartOne === "last7Days") {
      setLabelsChartOne(last7DaysStudentsLabels);
      setCountChartOne(last7DaysStudents);
    }

    if (timeFilterChartTwo === "last24Hours") {
      setLabelsChartTwo(last24HoursResumeLabels);
      setCountChartTwo(last24HoursResumes);
    } else if (timeFilterChartTwo === "last31Days") {
      setLabelsChartTwo(last31DaysResumeLabels);
      setCountChartTwo(last31DaysResumes);
    } else if (timeFilterChartTwo === "last7Days") {
      setLabelsChartTwo(last7DaysResumesLabels);
      setCountChartTwo(last7DaysResumes);
    }

    console.log(selectedJob);

    if (selectedJob) {
      const resumesWithSelectedJobTitle = last31DaysResumeData.filter(
        (resume) => resume.jobTitle.toLowerCase() === selectedJob.toLowerCase()
      );
      setCountChartThree(
        countObjectsByDate(resumesWithSelectedJobTitle).map(
          (resume) => resume.count
        )
      );
    }
  }, [timeFilterChartOne, timeFilterChartTwo, selectedJob]);

  return (
    <main>
      <Navbar />
      <div className={styles.statistics}>
        <Sidebar />
        <div className={styles.chartsection}>
          <h3>Statistics</h3>
          <div className={styles.chartDiv}>
            <div className={styles.chart}>
              <h3>Registered Students</h3>
              <div className={styles.timeFilter}>
                <button
                  className={styles.button}
                  onClick={() => {
                    setTimeFilterChartOne("last24Hours");
                  }}
                >
                  Last 24 Hrs
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    setTimeFilterChartOne("last7Days");
                  }}
                >
                  Last Week
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    setTimeFilterChartOne("last31Days");
                  }}
                >
                  Last Month
                </button>
              </div>
              <div>
                {labelsChartOne[0] +
                  " - " +
                  labelsChartOne[labelsChartOne.length - 1]}
              </div>
              <LineChart
                xTitle="Time"
                yTitle="Number of Students"
                title="Students Registered"
                labels={labelsChartOne}
                count={countChartOne}
              />
            </div>
            <div className={styles.chart}>
              <h3>Resumes Created</h3>
              <div className={styles.timeFilter}>
                <button
                  className={styles.button}
                  onClick={() => {
                    setTimeFilterChartTwo("last24Hours");
                  }}
                >
                  Last 24 Hrs
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    setTimeFilterChartTwo("last7Days");
                  }}
                >
                  Last Week
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    setTimeFilterChartTwo("last31Days");
                  }}
                >
                  Last Month
                </button>
              </div>
              <div>
                {labelsChartTwo[0] +
                  " - " +
                  labelsChartTwo[labelsChartTwo.length - 1]}
              </div>
              <LineChart
                xTitle="Time"
                yTitle="Number of Resumes"
                title="Resumes Created"
                labels={labelsChartTwo}
                count={countChartTwo}
              />
            </div>
            <div className={styles.chart}>
              <h3>Resumes with respective Job Titles</h3>
              <select
                onChange={(e) => setSelectedJob(e.target.value)}
                value={selectedJob}
              >
                <option value="">Select</option>
                {uniqueJobTitles.map((jobTitle) => (
                  <option value={jobTitle.toLowerCase()}>{jobTitle}</option>
                ))}
              </select>
              <div>
                {last31DaysResumeLabels[0] +
                  " - " +
                  last31DaysResumeLabels[last31DaysResumeLabels.length - 1]}
              </div>
              <LineChart
                xTitle="Time"
                yTitle="Number of Students"
                title="Students Registered"
                labels={last31DaysResumeLabels}
                count={countChartThree}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Statistics;
