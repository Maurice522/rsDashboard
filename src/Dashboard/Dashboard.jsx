import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Infographic from "../components/Infographic/Infographic";

const Dashboard = () => {
  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.info}>
          <Infographic title="Users" count="200" percentage="1.2" positive />
          <Infographic title="Users" count="200" percentage="1.2" positive />
          <Infographic title="Users" count="200" percentage="1.2" />
          <Infographic title="Users" count="200" percentage="1.2" />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
