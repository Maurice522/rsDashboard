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
import RightDiv from "../components/RightDiv/RightDiv";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <RightDiv active={active} />
      </div>
    </div>
  );
};

export default Dashboard;
