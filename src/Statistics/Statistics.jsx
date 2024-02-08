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
    console.log(result);
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
  const [timeFilter, setTimeFilter] = useState("last24Hours");

  const [studentLabels, setStudentLabels] = useState(last24HoursStudentsLabels);
  const [resumeLabels, setResumeLabels] = useState(last24HoursResumeLabels);
  const [jobTitleLabels, setJobTitleLabels] = useState(last24HoursResumeLabels);

  const [studentCount, setStudentCount] = useState(last24HoursStudents);
  const [resumeCount, setResumeCount] = useState(last24HoursResumes);
  const [jobTitleCount, setJobTitleCount] = useState(last24HoursResumes);

  const [selectedJob, setSelectedJob] = useState(null);

  const jobTitles = last31DaysResumeData.map((resume) => resume.jobTitle);
  const uniqueJobTitles = jobTitles.filter(
    (item, index) => jobTitles.indexOf(item) === index
  );

  useEffect(() => {
    if (timeFilter === "last24Hours") {
      const last24HoursResumesLabelsByJobTitle = getUsersCountByHour(
        last24HoursResumeData.filter(
          (resume) =>
            resume?.jobTitle?.toLowerCase() === selectedJob?.toLowerCase()
        )
      ).map((data) => data.hour.toString() + " Hours Ago");

      console.log(last24HoursResumesLabelsByJobTitle);

      const last = last24HoursResumeData.filter(
        (resume) =>
          resume?.jobTitle?.toLowerCase() === selectedJob?.toLowerCase()
      );
      const last24HoursResumesCountByJobTitle = getUsersCountByHour(last).map(
        (data) => data.count
      );
      console.log(last24HoursResumeData);
      console.log(last24HoursResumesCountByJobTitle);
      console.log(
        last24HoursResumeData.filter(
          (resume) =>
            resume?.jobTitle?.toLowerCase() === selectedJob?.toLowerCase()
        )
      );

      setStudentLabels(last24HoursResumeLabels);
      setStudentCount(last24HoursStudents);

      setResumeLabels(last24HoursResumeLabels);
      setResumeCount(last24HoursResumes);

      setJobTitleLabels(last24HoursResumesLabelsByJobTitle);
      setJobTitleCount(last24HoursResumesCountByJobTitle);
    } else if (timeFilter === "last31Days") {
      const last31DaysResumesLabelsByJobTitle = getUsersCountByHour(
        last31DaysResumeData.filter(
          (resume) =>
            resume?.jobTitle?.toLowerCase() === selectedJob?.toLowerCase()
        )
      ).map((data) => data.hour.toString() + " Hours Ago");

      const last31DaysResumesCountByJobTitle = getUsersCountByHour(
        last31DaysResumeData.filter(
          (resume) =>
            resume?.jobTitle?.toLowerCase() === selectedJob?.toLowerCase()
        )
      ).map((data) => data.count);

      setStudentLabels(last31DaysStudentsLabels);
      setStudentCount(last31DaysStudents);

      setResumeLabels(last31DaysResumeLabels);
      setResumeCount(last31DaysResumes);

      setJobTitleLabels(last31DaysResumesLabelsByJobTitle);
      setJobTitleCount(last31DaysResumesCountByJobTitle);
    } else if (timeFilter === "last7Days") {
      setStudentLabels(null);
      setStudentCount(null);

      setResumeLabels(null);
      setResumeCount(null);

      setJobTitleLabels(null);
      setJobTitleCount(null);
    }
  }, [timeFilter, selectedJob]);
  return (
    <main>
      <Navbar />
      <div className={styles.statistics}>
        <Sidebar />
        <div className={styles.chartsection}>
          <h3>Statistics</h3>
          <div className={styles.chartDiv}>
            <div className={styles.timeFilter}>
              <button
                className={styles.button}
                onClick={() => {
                  setTimeFilter("last24Hours");
                }}
              >
                Last 24 Hrs
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  setTimeFilter("last7Days");
                }}
              >
                Last Week
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  setTimeFilter("last31Days");
                }}
              >
                Last Month
              </button>
            </div>
            <div className={styles.chart}>
              <h3>Registered Students</h3>
              <LineChart
                xTitle="Time"
                yTitle="Number of Students"
                title="Students Registered"
                labels={studentLabels}
                count={studentCount}
              />
            </div>
            <div className={styles.chart}>
              <h3>Resumes Created</h3>
              <LineChart
                xTitle="Time"
                yTitle="Number of Students"
                title="Resumes Created"
                labels={resumeLabels}
                count={resumeCount}
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
                  <option value={jobTitle?.toLowerCase()}>{jobTitle}</option>
                ))}
              </select>
              <LineChart
                xTitle="Time"
                yTitle="Number of Students"
                title="Students Registered"
                labels={jobTitleLabels}
                count={jobTitleCount}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Statistics;
