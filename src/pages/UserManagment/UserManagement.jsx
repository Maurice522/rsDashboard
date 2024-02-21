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

import styles from "./UserManagement.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import UserManagementTable from "../components/UserManagementTable/UserManagmentTable";

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
            <UserManagementTable />
          </div>
        </div>
      </div>
    </main>
  );
}

//add view button
//modal view
//no of resumes created by the student
//redirect bgutton to the student's resume repo
