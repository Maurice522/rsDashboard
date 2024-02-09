import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Infographic from "../components/Infographic/Infographic";
import LineChart from "../components/LineChart/LineChart";

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

  const { count: totalStudentCount, labels: totalStudentLabels } =
    generateData(20);
  const { count: totalActiveCount, labels: totalActiveLabels } =
    generateData(16);

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
              count="200"
              percentage="1.2"
              positive
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
              count="200"
              percentage="1.2"
            />
            <Infographic
              title="Active Students"
              type="4"
              count="200"
              percentage="1.2"
            />
          </div>
          <div className={styles.charts}>
            <div className={styles.chart}>
              <p>
                <b>Total Registred Students</b>
              </p>
              <p>
                {totalStudentLabels[0] +
                  " - " +
                  totalStudentLabels[totalStudentLabels.length - 1]}
              </p>
              <LineChart
                labels={totalStudentLabels}
                count={totalStudentCount}
                title="Total Registered Students"
              />
            </div>
            <div className={styles.chart}>
              <p>
                <b>Total Active Users</b>
              </p>
              <p>
                {totalActiveLabels[0] +
                  " - " +
                  totalActiveLabels[totalActiveLabels.length - 1]}
              </p>
              <LineChart
                labels={totalActiveLabels}
                count={totalActiveCount}
                title="Total Active Users"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
