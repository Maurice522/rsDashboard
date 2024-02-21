import React from "react";
import { Link } from "react-router-dom";
import styles from "./StudentCard.module.css";
import { getInitials } from "../../helper/nameInitials";

const StudentCard = ({ student, grid }) => {
  const studentInitials = getInitials(student.name);
  return (
    <>
      {grid ? (
        <Link to={`/student/${student.email}`} className={styles.gridCard}>
          <div className={styles.cardGridContent}>
            <div className={styles.initials}>
              <b>{studentInitials}</b>
            </div>
            <h3>{student.name}</h3>
            <p>
              <b>Roll Number: </b>
              <b>{student.rollNumber}</b>
            </p>
            <p>
              <b>Degree: </b>
              <b>{student.degree}</b>
            </p>
            <p>
              <b>Batch: </b>
              <b>{student.batch}</b>
            </p>
          </div>
        </Link>
      ) : (
        <Link to={`/student/${student.email}`} className={styles.listCard}>
          <div className={styles.cardListContent}>
            <div className={styles.initials}>
              <b>{studentInitials}</b>
            </div>
            <h3>{student.name}</h3>
            <p>
              <b>Roll Number: </b>
              <b>{student.rollNumber}</b>
            </p>
            <p>
              <b>Degree: </b>
              <b>{student.degree}</b>
            </p>
            <p>
              <b>Batch: </b>
              <b>{student.batch}</b>
            </p>
          </div>
        </Link>
      )}
    </>
  );
};

export default StudentCard;
