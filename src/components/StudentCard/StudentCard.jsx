import React from "react";
import { Link } from "react-router-dom";
import styles from "./StudentCard.module.css";

const StudentCard = ({ student }) => {
  return (
    <Link to={`/student/${student.email}`} className={styles.card}>
      <div className={styles.cardContent}>
        <h2>{student.name}</h2>
        <p>Student ID: {student.id}</p>
        <p>Batch: {student.batch}</p>
        <p>Degree: {student.degree}</p>
      </div>
    </Link>
  );
};

export default StudentCard;
