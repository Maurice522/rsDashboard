import React, { useEffect, useState } from "react";
import "firebase/firestore";
import StudentCard from "../components/StudentCard/StudentCard";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "./ResumeRepository.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const ResumeRepository = () => {
  const [searchText, setSearchText] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "meta", "registeredUsers");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setStudents(docSnap.data().users);
      } else {
        console.error("Cannot get users");
      }
    };
    fetchData();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      (student.name &&
        student.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (student.degree &&
        student.degree.toLowerCase().includes(searchText.toLowerCase())) ||
      (student.batch &&
        student.batch.toLowerCase().includes(searchText.toLowerCase())) ||
      (student.id &&
        student.id.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <main>
      <Navbar />
      <div className={styles.resumeRepository}>
        <Sidebar />
        <div className={styles.container}>
          <h2>Students</h2>
          <div className={styles.searchBox}>
            <input
              value={searchText}
              type="text"
              placeholder="Search for any student"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className={styles.cardGrid}>
            {filteredStudents?.map((student, index) => (
              <StudentCard key={index} student={student} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResumeRepository;
