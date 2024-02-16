import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  XIcon,
} from "lucide-react";
import { logout } from "../../redux/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { notvisible, selectsidebar } from "../../redux/slices/sidebarSlice";
import "animate.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const location = useLocation();
  const sidebarVisible = useSelector(selectsidebar);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    if (width > 1024 && sidebarVisible) {
      dispatch(notvisible());
    }
  }, [width, sidebarVisible]);

  return (
    <div
      className={`${styles.buttonContainer} ${
        sidebarVisible && styles.visible
      } ${
        sidebarVisible &&
        "animate__animated animate__slideInLeft animate__faster"
      }`}
    >
      {sidebarVisible && (
        <button
          className={styles.sidebarButton}
          onClick={() => {
            dispatch(notvisible());
          }}
        >
          <XIcon />
        </button>
      )}

      <button
        onClick={() => {
          setActive("dashboard");
          navigate("/dashboard");
        }}
        className={`${styles.button} ${
          active === "dashboard" || location.pathname === "/dashboard"
            ? styles.active
            : ""
        }`}
      >
        <LayoutDashboard />
        <p>Dashboard</p>
      </button>
      <button
        onClick={() => {
          setActive("user-management");
          navigate("/user-management");
        }}
        className={`${styles.button} ${
          active === "user-management" ||
          location.pathname === "/user-management"
            ? styles.active
            : ""
        }`}
      >
        <User />
        <p>User Management</p>
      </button>
      {/* 
      <button
        onClick={() => {
          setActive("statistics");
          navigate("/statistics");
        }}
        className={`${styles.button} ${
          active === "statistics" || location.pathname === "/statistics"
            ? styles.active
            : ""
        }`}
      >
        <PieChart />
        <p>Statistics</p>
      </button> */}

      {/* <button
        onClick={() => {
          setActive("resume-analytics");
          navigate("/resume-analytics");
        }}
        className={`${styles.button} ${
          active === "resume-analytics" ||
          location.pathname === "/resume-analytics"
            ? styles.active
            : ""
        }`}
      >
        <LineChart />
        <p>Resume Usage Analytics</p>
      </button> */}

      <button
        onClick={() => {
          setActive("activity-logs");
          navigate("/activity-logs");
        }}
        className={`${styles.button} ${
          active === "activity-logs" || location.pathname === "/activity-logs"
            ? styles.active
            : ""
        }`}
      >
        <BarChart />
        <p>Activity Logs</p>
      </button>

      <button
        onClick={() => {
          setActive("resume-repository");
          navigate("/resume-repository");
        }}
        className={`${styles.button} ${
          active === "resume-repository" ||
          location.pathname === "/resume-repository"
            ? styles.active
            : ""
        }`}
      >
        <Notebook />
        <p>Resume Repository</p>
      </button>

      <button
        onClick={() => {
          setActive("email-upload");
          navigate("/email-upload");
        }}
        className={`${styles.button} ${
          active === "email-upload" || location.pathname === "/email-upload"
            ? styles.active
            : ""
        }`}
      >
        <Upload />
        <p>Upload Student Data</p>
      </button>

      <button
        onClick={() => dispatch(logout())}
        className={`${styles.button} ${styles.logout}`}
      >
        <Power />
        <p>logout</p>
      </button>
    </div>
  );
};

export default Sidebar;
