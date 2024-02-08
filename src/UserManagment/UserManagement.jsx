import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  convertedArrayofStudents,
  last31DaysResumeData,
  last31DaysStudentsData,
} from "./last31DaysData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  last24HoursResumeData,
  last24HoursStudentsData,
} from "./last24HrsData";
import styles from "./UserManagement.module.css";
import DynamicTableComponent from "../components/Table/DynamicTable";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function UserManagement() {
  return (
    <main>
      <Navbar />
      <div className={styles.userManagement}>
        <Sidebar />
        <div className={styles.container}>
          <div className={styles.userTable}>
            <h3>Registered Users</h3>
            <DynamicTableComponent data={convertedArrayofStudents} />
          </div>
        </div>
      </div>
    </main>
  );
}
