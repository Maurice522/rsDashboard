import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Infographic from "../components/Infographic/Infographic";
import LineChart from "../components/LineChart/LineChart";
import {
  calculateIncreaseInLastWeek,
  totalActivitiesArray,
  totalResumesArray,
  totalUsersArray,
} from "./helper";
import Statistics from "../components/Statistics/Statistics";

const Dashboard = () => {
  const setSeed = (seed) => {
    let seedValue = seed % 2147483647;
    if (seedValue <= 0) {
      seedValue += 2147483646;
    }
    Math.seed = seedValue;
  };

  const random = () => {
    let x = Math.seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    Math.seed = x;
    return (x > 0 ? x : -x) / 2147483647;
  };

  const generateData = (seed) => {
    setSeed(seed);
    let count = [];
    let labels = [];
    let currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      let date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      labels.unshift(date.toISOString().slice(0, 10));
      count.unshift(Math.floor(random() * 100));
    }
    return { count, labels };
  };

  const { count: totalStudentCount } = generateData(20);
  const { count: totalActiveCount } = generateData(16);

  const labels = [
    "03 Feb",
    "04 Feb",
    "05 Feb",
    "06 Feb",
    "07 Feb",
    "08 Feb",
    "09 Feb",
  ];

  const {
    percentageChange: totalStudentsPercentageChange,
    changeStatus: totalStudentsChangeStatus,
  } = calculateIncreaseInLastWeek(totalUsersArray);

  const {
    percentageChange: totalResumesPercentageChange,
    changeStatus: totalResumesChangeStatus,
  } = calculateIncreaseInLastWeek(totalResumesArray);

  const {
    percentageChange: totalActivitiesPercentageChange,
    changeStatus: totalActivitiesChangeStatus,
  } = calculateIncreaseInLastWeek(totalActivitiesArray);

  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.dashboard}>
          <div className={styles.info}>
            <Infographic
              title="Total Students"
              type="1"
              count={totalUsersArray.length}
              percentage={totalStudentsPercentageChange}
              positive={totalStudentsChangeStatus === "Increase" ? true : false}
            />
            <Infographic
              title="New Students"
              type="2"
              count="200"
              percentage="1.2"
              positive
            />
            <Infographic
              title="Resumes Created"
              type="3"
              count={totalResumesArray.length}
              percentage={totalResumesPercentageChange}
              positive={totalResumesChangeStatus === "Increase" ? true : false}
            />
            <Infographic
              title="Active Students"
              type="4"
              count={totalActivitiesArray.length}
              percentage={totalActivitiesPercentageChange}
              positive={
                totalActivitiesChangeStatus === "Increase" ? true : false
              }
            />
          </div>
          <div className={styles.charts}>
            <div className={styles.chart}>
              <p>
                <b>Total Registred Students</b>
              </p>
              <p>{labels[0] + " - " + labels[labels.length - 1]}</p>
              <LineChart
                labels={labels}
                count={totalStudentCount}
                title="Total Registered Students"
              />
            </div>
            <div className={styles.chart}>
              <p>
                <b>Total Active Users</b>
              </p>
              <p>{labels[0] + " - " + labels[labels.length - 1]}</p>
              <LineChart
                labels={labels}
                count={totalActiveCount}
                title="Total Active Users"
              />
            </div>
          </div>
          <Statistics />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
