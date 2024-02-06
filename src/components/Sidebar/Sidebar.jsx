import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Sidebar.module.css";
import {
  BarChart,
  LayoutDashboard,
  LineChart,
  Notebook,
  PieChart,
  Power,
  Upload,
  User,
} from "lucide-react";
import { logout } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  return (
    <div className={styles.buttonContainer}>
      <button
        onClick={() => {
          setActive("dashboard");
          navigate("/dashboard");
        }}
        className={`${styles.button} ${
          active === "user-management" ? styles.active : ""
        }`}
      >
        <LayoutDashboard />
        Dashboard
      </button>
      <button
        onClick={() => {
          setActive("user-management");
          navigate("/user-management");
        }}
        className={`${styles.button} ${
          active === "user-management" ? styles.active : ""
        }`}
      >
        <User />
        User Management
      </button>

      <button
        onClick={() => {
          setActive("statistics");
          navigate("/statistics");
        }}
        className={`${styles.button} ${
          active === "statistics" ? styles.active : ""
        }`}
      >
        <PieChart />
        Statistics
      </button>

      <button
        onClick={() => {
          setActive("resume-analytics");
          navigate("/resume-analytics");
        }}
        className={`${styles.button} ${
          active === "resume-analytics" ? styles.active : ""
        }`}
      >
        <LineChart />
        Resume Usage Analytics
      </button>

      <button
        onClick={() => {
          setActive("activity-logs");
          navigate("/activity-logs");
        }}
        className={`${styles.button} ${
          active === "activity-logs" ? styles.active : ""
        }`}
      >
        <BarChart />
        Activity Logs
      </button>

      <button
        onClick={() => {
          setActive("resume-repository");
          navigate("/resume-repository");
        }}
        className={`${styles.button} ${
          active === "resume-repository" ? styles.active : ""
        }`}
      >
        <Notebook />
        Resume Repository
      </button>

      <button
        onClick={() => {
          setActive("upload-emails");
          navigate("/email-upload");
        }}
        className={`${styles.button} ${
          active === "upload-emails" ? styles.active : ""
        }`}
      >
        <Upload />
        Upload User Emails
      </button>

      <button
        onClick={() => dispatch(logout())}
        className={`${styles.button} ${styles.logout}`}
      >
        <Power />
        logout
      </button>
    </div>
  );
};

export default Sidebar;
