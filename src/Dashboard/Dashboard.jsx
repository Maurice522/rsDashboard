import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import { useDispatch } from "react-redux";
import {
  BarChart,
  LineChart,
  LogOut,
  Notebook,
  Upload,
  User,
} from "lucide-react";
import { logout } from "../redux/slices/userSlice";
import UserManagement from "../UserManagment/UserManagement";
import AcitvityLogs from "../ActivityLogs/AcitvityLogs";
import ResumeRepository from "../ResumeRepository/ResumeRepositoty";
import EmailUpload from "../EmailUpload/EmailUpload";
import Welcome from "../Welcome/Welcome";
import RightDiv from "../components/RightDiv/RightDiv";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => setActive("user-management")}
          className={`${styles.button} ${
            active === "user-management" ? styles.active : ""
          }`}
        >
          <User />
          User Management
        </button>

        <button
          onClick={() => setActive("resume-analytics")}
          className={`${styles.button} ${
            active === "resume-analytics" ? styles.active : ""
          }`}
        >
          <LineChart />
          Resume Usage Analytics
        </button>

        <button
          onClick={() => setActive("activity-logs")}
          className={`${styles.button} ${
            active === "activity-logs" ? styles.active : ""
          }`}
        >
          <BarChart />
          Activity Logs
        </button>

        <button
          onClick={() => setActive("resume-repository")}
          className={`${styles.button} ${
            active === "resume-repository" ? styles.active : ""
          }`}
        >
          <Notebook />
          Resume Repository
        </button>

        <button
          onClick={() => setActive("upload-emails")}
          className={`${styles.button} ${
            active === "upload-emails" ? styles.active : ""
          }`}
        >
          <Upload />
          Upload User Emails
        </button>
        <button onClick={() => dispatch(logout())} className={styles.button}>
          <LogOut />
          logout
        </button>
      </div>
      <RightDiv active={active} />
    </div>
  );
};

export default Dashboard;
