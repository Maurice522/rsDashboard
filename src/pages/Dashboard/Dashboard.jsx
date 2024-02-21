import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import { calculateIncreaseInLastWeek } from "../../helper/calculateIncreaseInWeek";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Statistics from "../../components/Statistics/Statistics";
import Infographic from "../../components/Infographic/Infographic";

const Dashboard = () => {
  const [studentData, setStudentData] = useState([]);
  const [resumeData, setResumeData] = useState([]);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      const docRef = doc(db, "meta", "registeredUsers");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStudentData(docSnap.data()?.users);
      } else {
        toast.error("Student data missing!");
      }
    };
    const fetchResumeData = async () => {
      const docRef = doc(db, "meta", "createdResume");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setResumeData(docSnap.data()?.resumes);
      } else {
        toast.error("Student data missing!");
      }
    };
    const fetchActivityData = async () => {
      const docRef = doc(db, "meta", "activityLog");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setActivityData(docSnap.data()?.activities);
      } else {
        toast.error("Student data missing!");
      }
    };
    fetchStudentData();
    fetchResumeData();
    fetchActivityData();
  }, []);

  const {
    percentageChange: totalStudentsPercentageChange,
    changeStatus: totalStudentsChangeStatus,
  } = calculateIncreaseInLastWeek(studentData);

  const {
    percentageChange: totalResumesPercentageChange,
    changeStatus: totalResumesChangeStatus,
  } = calculateIncreaseInLastWeek(resumeData);

  const {
    percentageChange: totalActivitiesPercentageChange,
    changeStatus: totalActivitiesChangeStatus,
  } = calculateIncreaseInLastWeek(activityData);

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
              count={
                studentData?.filter(
                  (obj, index, self) =>
                    index === self.findIndex((t) => t.email === obj.email)
                ).length
              }
              percentage={totalStudentsPercentageChange}
              positive={totalStudentsChangeStatus === "Increase" ? true : false}
            />
            <Infographic
              title="New Students"
              type="2"
              count="15"
              percentage="1.2"
              positive
            />
            <Infographic
              title="Resumes Created"
              type="3"
              count={resumeData?.length}
              percentage={totalResumesPercentageChange}
              positive={totalResumesChangeStatus === "Increase" ? true : false}
            />
            <Infographic
              title="Active Students"
              type="4"
              count={
                activityData.filter(
                  (obj, index, self) =>
                    index === self.findIndex((t) => t.email === obj.email)
                ).length
              }
              percentage={totalActivitiesPercentageChange}
              positive={
                totalActivitiesChangeStatus === "Increase" ? true : false
              }
            />
          </div>
          <Statistics />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
