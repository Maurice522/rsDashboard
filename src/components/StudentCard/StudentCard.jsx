import React from "react";
import { Link } from "react-router-dom";
import styles from "./StudentCard.module.css";

const StudentCard = ({ student }) => {
  const studentInitials =
    student.name.split(" ")[0][0] + student.name.split(" ")[1][0];
  return (
    <Link to={`/student/${student.email}`} className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.initials}>
          <b>{studentInitials}</b>
        </div>
        <h3>{student.name}</h3>
        <p>
          <b>{student.batch}</b>
        </p>
        <p>
          <b>{student.degree}</b>
        </p>
      </div>
    </Link>
  );
};

export default StudentCard;
