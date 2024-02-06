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
import { Line } from "react-chartjs-2";
import styles from "./Statistics.module.css";

const Statistics = () => {
  function getUsersCountByHour(dataArray) {
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
  const [chartType, setChartType] = useState("students");
  const [labels, setLabels] = useState(last24HoursStudentsLabels);
  const [selectedJob, setSelectedJob] = useState(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Last 24 Hours",
        data: last24HoursStudents,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0.2,
      },
    ],
  });

  useEffect(() => {
    if (chartType === "students" && timeFilter === "last24Hours") {
      setSelectedJob(null);
      setLabels(last24HoursStudentsLabels);
      setData({
        labels,
        datasets: [
          {
            label: "Last 24 Hours",
            data: last24HoursStudents,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            lineTension: 0.2,
          },
        ],
      });
    } else if (chartType === "students" && timeFilter === "last31Days") {
      setSelectedJob(null);
      setLabels(last31DaysStudentsLabels);
      setData({
        labels,
        datasets: [
          {
            label: "Last 31 Days",
            data: last31DaysStudents,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            lineTension: 0.2,
          },
        ],
      });
    } else if (chartType === "resumes" && timeFilter === "last24Hours") {
      setSelectedJob(null);
      setLabels(last24HoursResumeLabels);
      setData({
        labels,
        datasets: [
          {
            label: "Last 24 Hours",
            data: last24HoursResumes,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            lineTension: 0.2,
          },
        ],
      });
    } else if (chartType === "resumes" && timeFilter === "last24Hours") {
      setSelectedJob(null);
      setLabels(last24HoursResumeLabels);
      setData({
        labels,
        datasets: [
          {
            label: "Last 24 Hours",
            data: last24HoursResumes,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            lineTension: 0.2,
          },
        ],
      });
    } else if (chartType === "resumes" && timeFilter === "last31Days") {
      setSelectedJob(null);
      setLabels(last31DaysResumeLabels);
      setData({
        labels,
        datasets: [
          {
            label: "Last 31 Days",
            data: last31DaysResumes,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            lineTension: 0.2,
          },
        ],
      });
    } else if (
      chartType === "jobTitle" &&
      selectedJob !== null &&
      timeFilter === "last24Hours"
    ) {
      const last24HoursResumesLabelsByJobTitle = getUsersCountByHour(
        last24HoursResumeData.filter(
          (resume) =>
            resume.jobTitle.toLowerCase() === selectedJob.toLowerCase()
        )
      ).map((data) => data.hour.toString() + " Hours Ago");

      const last24HoursResumesCountByJobTitle = getUsersCountByHour(
        last24HoursResumeData.filter(
          (resume) =>
            resume.jobTitle.toLowerCase() === selectedJob.toLowerCase()
        )
      ).map((data) => data.count);
      setLabels(last24HoursResumesLabelsByJobTitle);
      setData({
        labels,
        datasets: [
          {
            label: "Last 24 Hours",
            data: last24HoursResumesCountByJobTitle,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            lineTension: 0.2,
          },
        ],
      });
    } else if (
      chartType === "jobTitle" &&
      selectedJob !== null &&
      timeFilter === "last31Days"
    ) {
      const last31DaysResumesLabelsByJobTitle = getUsersCountByHour(
        last31DaysResumeData.filter(
          (resume) =>
            resume.jobTitle.toLowerCase() === selectedJob.toLowerCase()
        )
      ).map((data) => data.hour.toString() + " Hours Ago");

      const last31DaysResumesCountByJobTitle = getUsersCountByHour(
        last31DaysResumeData.filter(
          (resume) =>
            resume.jobTitle.toLowerCase() === selectedJob.toLowerCase()
        )
      ).map((data) => data.count);
      setLabels(last31DaysResumesLabelsByJobTitle);
      setData({
        labels,
        datasets: [
          {
            label: "Last 31 Days",
            data: last31DaysResumesCountByJobTitle,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            lineTension: 0.2,
          },
        ],
      });
    }
  }, [chartType, timeFilter, labels, selectedJob]);
  return (
    <div>
      <Navbar />
      <div className={styles.statistics}>
        <Sidebar />
        <div className={styles.chartsection}>
          <select
            className={styles.select}
            onChange={(e) => {
              setTimeFilter(e.target.value);
            }}
          >
            <option value="">Select</option>
            <option value="last24Hours">Last 24 Hours</option>
            <option value="last31Days">Last 31 Days</option>
          </select>
          <select
            className={styles.select}
            onChange={(e) => {
              setChartType(e.target.value);
            }}
          >
            <option value="">Select</option>
            <option value="students">Students</option>
            <option value="resumes">Resumes</option>
            <option value="jobTitle">Students of certain Job Title</option>
          </select>
          {chartType === "jobTitle" && (
            <select
              onChange={(e) => setSelectedJob(e.target.value)}
              value={selectedJob}
            >
              <option value="">Select</option>
              {last31DaysResumeData.map((resume) => (
                <option value={resume.jobTitle.toLowerCase()}>
                  {resume.jobTitle}
                </option>
              ))}
            </select>
          )}
          <div className={styles.chart}>
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
