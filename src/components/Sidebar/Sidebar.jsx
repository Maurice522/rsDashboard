import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Sidebar.module.css";
import {
  BarChart,
  LineChart,
  LogOut,
  Notebook,
  PieChart,
  Upload,
  User,
} from "lucide-react";
import { logout } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);
  return (
    <div className={styles.buttonContainer}>
      <Link to="/user-management">
        <button
          onClick={() => setActive("user-management")}
          className={`${styles.button} ${
            active === "user-management" ? styles.active : ""
          }`}
        >
          <User />
          User Management
        </button>
      </Link>
      <Link to="/statistics">
        <button
          onClick={() => setActive("statistics")}
          className={`${styles.button} ${
            active === "statistics" ? styles.active : ""
          }`}
        >
          <PieChart />
          Statistics
        </button>
      </Link>
      <Link to="/resume-analytics">
        <button
          onClick={() => setActive("resume-analytics")}
          className={`${styles.button} ${
            active === "resume-analytics" ? styles.active : ""
          }`}
        >
          <LineChart />
          Resume Usage Analytics
        </button>
      </Link>
      <Link to="/activity-logs">
        <button
          onClick={() => setActive("activity-logs")}
          className={`${styles.button} ${
            active === "activity-logs" ? styles.active : ""
          }`}
        >
          <BarChart />
          Activity Logs
        </button>
      </Link>
      <Link to="/resume-repository">
        <button
          onClick={() => setActive("resume-repository")}
          className={`${styles.button} ${
            active === "resume-repository" ? styles.active : ""
          }`}
        >
          <Notebook />
          Resume Repository
        </button>
      </Link>
      <Link to="/email-upload">
        <button
          onClick={() => setActive("upload-emails")}
          className={`${styles.button} ${
            active === "upload-emails" ? styles.active : ""
          }`}
        >
          <Upload />
          Upload User Emails
        </button>
      </Link>
      <button onClick={() => dispatch(logout())} className={styles.button}>
        <LogOut />
        logout
      </button>
    </div>
  );
};

export default Sidebar;
