import React, { useEffect, useState } from "react";
import "firebase/firestore";
import StudentCard from "../components/StudentCard/StudentCard";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "./ResumeRepository.module.css";

const ResumeRepository = () => {
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

  return (
    <div className={styles.container}>
      <h2>Students</h2>
      <div className={styles.cardGrid}>
        {students?.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
};

export default ResumeRepository;
