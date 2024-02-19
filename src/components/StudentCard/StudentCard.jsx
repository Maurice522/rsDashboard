import React from "react";
import { Link } from "react-router-dom";
import styles from "./StudentCard.module.css";
import { getInitials } from "../../helper/nameInitials";

const StudentCard = ({ student }) => {
  const studentInitials = getInitials(student.name);
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
