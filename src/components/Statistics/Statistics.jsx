import React, { useEffect, useState } from "react";
import styles from "./Statistics.module.css";
import LineChart from "../LineChart/LineChart";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import {
  getUsersCountByHour,
  getUsersCountByMonth,
  getUsersCountByWeek,
} from "../../helper/getObjectsCount";
import {
  filterLast24Hours,
  filterLastMonth,
  filterLastWeek,
} from "../../helper/filterByTime";

const Statistics = () => {
  const [studentData, setStudentData] = useState([]);
  const [resumeData, setResumeData] = useState([]);
  const [resumeDataLastMonth, setResumeDataLastMonth] = useState(resumeData);
  const [resumeDataLastWeek, setResumeDataLastWeek] = useState(resumeData);
  const [resumeDataLast24Hours, setResumeDataLast24Hours] =
    useState(resumeData);

  useEffect(() => {
    const fetchStudentData = async () => {
      const docRef = doc(db, "meta", "registeredUsers");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStudentData(docSnap?.data()?.users);
      } else {
        toast.error("Student data missing!");
      }
    };
    const fetchResumeData = async () => {
      const docRef = doc(db, "meta", "createdResume");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setResumeData(docSnap?.data()?.resumes);
      } else {
        toast.error("Resume data missing!");
      }
    };
    fetchStudentData();
    fetchResumeData();
  }, []);

  const last7DaysStudentsLabels = getUsersCountByWeek(studentData).map((day) =>
    day.date.substring(0, day.date.length - 4)
  );

  const last7DaysStudents = getUsersCountByWeek(studentData).map(
    (day) => day.count
  );

  const last7DaysResumesLabels = getUsersCountByWeek(resumeDataLastWeek).map(
    (day) => day.date.substring(0, day.date.length - 4)
  );

  const last7DaysResumes = getUsersCountByWeek(resumeDataLastWeek).map(
    (day) => day.count
  );

  const last31DaysStudentsLabels = getUsersCountByMonth(studentData).map(
    (day) => day.date.split(", ")[0]
  );

  const last31DaysStudents = getUsersCountByMonth(studentData).map(
    (day) => day.count
  );

  const last31DaysResumeLabels = getUsersCountByMonth(resumeDataLastMonth).map(
    (day) => day.date.split(", ")[0]
  );

  const last31DaysResumes = getUsersCountByMonth(resumeDataLastMonth).map(
    (day) => day.count
  );

  const last24HoursStudentsLabels = getUsersCountByHour(studentData).map(
    (data) => data.hour.toString() + " Hours Ago"
  );

  const last24HoursStudents = getUsersCountByHour(studentData).map(
    (data) => data.count
  );

  const last24HoursResumeLabels = getUsersCountByHour(
    resumeDataLast24Hours
  ).map((data) => data.hour.toString() + " Hours Ago");

  const last24HoursResumes = getUsersCountByHour(resumeDataLast24Hours).map(
    (data) => data.count
  );

  const [timeFilterChartOne, setTimeFilterChartOne] = useState("last31Days");
  const [timeFilterChartThree, setTimeFilterChartThree] =
    useState("last31Days");

  const [activeOneOne, setActiveOneOne] = useState(false);
  const [activeOneTwo, setActiveOneTwo] = useState(false);
  const [activeOneThree, setActiveOneThree] = useState(false);
  const [activeThreeOne, setActiveThreeOne] = useState(false);
  const [activeThreeTwo, setActiveThreeTwo] = useState(false);
  const [activeThreeThree, setActiveThreeThree] = useState(false);

  const [labelsChartOne, setLabelsChartOne] = useState(
    last31DaysStudentsLabels
  );
  const [labelsChartTwo, setLabelsChartTwo] = useState(last31DaysResumeLabels);
  const [labelsChartThree, setLabelsChartThree] = useState(
    last31DaysResumeLabels
  );

  const [countChartOne, setCountChartOne] = useState(last31DaysStudents);
  const [countChartTwo, setCountChartTwo] = useState(last31DaysResumes);
  const [countChartThree, setCountChartThree] = useState(last31DaysResumes);

  const [selectedJob, setSelectedJob] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");

  const jobTitles = resumeData.map((resume) => resume.jobTitle);
  const uniqueJobTitles = jobTitles.filter(
    (item, index) => jobTitles.indexOf(item) === index
  );

  const degrees = resumeData.map((resume) => resume.degree);
  const uniqueDegrees = degrees.filter(
    (item, index) => degrees.indexOf(item) === index
  );

  const batches = resumeData.map((resume) => resume.batch);
  const uniqueBatches = batches.filter(
    (item, index) => batches.indexOf(item) === index
  );

  useEffect(() => {
    if (timeFilterChartOne === "last24Hours") {
      setActiveOneOne(true);
      setActiveOneTwo(false);
      setActiveOneThree(false);
      setLabelsChartOne(last24HoursStudentsLabels);
      setCountChartOne(last24HoursStudents);
    } else if (timeFilterChartOne === "last31Days") {
      setActiveOneOne(false);
      setActiveOneTwo(false);
      setActiveOneThree(true);
      setLabelsChartOne(last31DaysStudentsLabels);
      setCountChartOne(last31DaysStudents);
    } else if (timeFilterChartOne === "last7Days") {
      setActiveOneOne(false);
      setActiveOneTwo(true);
      setActiveOneThree(false);
      setLabelsChartOne(last7DaysStudentsLabels);
      setCountChartOne(last7DaysStudents);
    }

    if (timeFilterChartThree === "last24Hours") {
      setActiveThreeOne(true);
      setActiveThreeTwo(false);
      setActiveThreeThree(false);
      setResumeDataLast24Hours(filterLast24Hours(resumeData));
      setResumeDataLastMonth(filterLastMonth(resumeData));
      setResumeDataLastWeek(filterLastWeek(resumeData));
      setLabelsChartThree(last24HoursResumeLabels);
      setCountChartThree(last24HoursResumes);
    } else if (timeFilterChartThree === "last31Days") {
      setActiveThreeOne(false);
      setActiveThreeTwo(false);
      setActiveThreeThree(true);
      setResumeDataLast24Hours(filterLast24Hours(resumeData));
      setResumeDataLastMonth(filterLastMonth(resumeData));
      setResumeDataLastWeek(filterLastWeek(resumeData));
      setLabelsChartThree(last31DaysResumeLabels);
      setCountChartThree(last31DaysResumes);
    } else if (timeFilterChartThree === "last7Days") {
      setActiveThreeOne(false);
      setActiveThreeTwo(true);
      setActiveThreeThree(false);
      setResumeDataLast24Hours(filterLast24Hours(resumeData));
      setResumeDataLastMonth(filterLastMonth(resumeData));
      setResumeDataLastWeek(filterLastWeek(resumeData));
      setLabelsChartThree(last7DaysResumesLabels);
      setCountChartThree(last7DaysResumes);
    }

    if (selectedJob && selectedBatch && selectedDegree) {
      const resumesWithSelectedJobTitle = resumeData
        .filter(
          (resume) =>
            resume.jobTitle.toLowerCase() === selectedJob.toLowerCase()
        )
        .filter(
          (resume) =>
            resume.degree.toLowerCase() === selectedDegree.toLowerCase()
        )
        .filter(
          (resume) => resume.batch.toLowerCase() === selectedBatch.toLowerCase()
        );
      setCountChartThree(
        getUsersCountByMonth(resumesWithSelectedJobTitle).map(
          (resume) => resume.count
        )
      );
    } else if (!selectedJob && selectedBatch && selectedDegree) {
      const resumesWithSelectedJobTitle = resumeData
        .filter(
          (resume) =>
            resume.degree.toLowerCase() === selectedDegree.toLowerCase()
        )
        .filter(
          (resume) => resume.batch.toLowerCase() === selectedBatch.toLowerCase()
        );
      setCountChartThree(
        getUsersCountByMonth(resumesWithSelectedJobTitle).map(
          (resume) => resume.count
        )
      );
    } else if (selectedJob && !selectedBatch && selectedDegree) {
      const resumesWithSelectedJobTitle = resumeData
        .filter(
          (resume) =>
            resume.jobTitle.toLowerCase() === selectedJob.toLowerCase()
        )
        .filter(
          (resume) =>
            resume.degree.toLowerCase() === selectedDegree.toLowerCase()
        );
      setCountChartThree(
        getUsersCountByMonth(resumesWithSelectedJobTitle).map(
          (resume) => resume.count
        )
      );
    } else if (selectedJob && selectedBatch && !selectedDegree) {
      const resumesWithSelectedJobTitle = resumeData
        .filter(
          (resume) =>
            resume.jobTitle.toLowerCase() === selectedJob.toLowerCase()
        )
        .filter(
          (resume) => resume.batch.toLowerCase() === selectedBatch.toLowerCase()
        );
      setCountChartThree(
        getUsersCountByMonth(resumesWithSelectedJobTitle).map(
          (resume) => resume.count
        )
      );
    } else if (!selectedJob && !selectedBatch && selectedDegree) {
      const resumesWithSelectedJobTitle = resumeData.filter(
        (resume) => resume.degree.toLowerCase() === selectedDegree.toLowerCase()
      );

      setCountChartThree(
        getUsersCountByMonth(resumesWithSelectedJobTitle).map(
          (resume) => resume.count
        )
      );
    } else if (!selectedJob && selectedBatch && !selectedDegree) {
      const resumesWithSelectedJobTitle = resumeData.filter(
        (resume) => resume.batch.toLowerCase() === selectedBatch.toLowerCase()
      );
      setCountChartThree(
        getUsersCountByMonth(resumesWithSelectedJobTitle).map(
          (resume) => resume.count
        )
      );
    } else if (selectedJob && !selectedBatch && !selectedDegree) {
      const resumesWithSelectedJobTitle = resumeData.filter(
        (resume) => resume.jobTitle.toLowerCase() === selectedJob.toLowerCase()
      );
      setCountChartThree(
        getUsersCountByMonth(resumesWithSelectedJobTitle).map(
          (resume) => resume.count
        )
      );
    } else if (!selectedJob && !selectedBatch && !selectedDegree) {
      const resumesWithSelectedJobTitle = resumeData;
      setCountChartThree(
        getUsersCountByMonth(resumesWithSelectedJobTitle).map(
          (resume) => resume.count
        )
      );
    }
  }, [
    timeFilterChartOne,
    timeFilterChartThree,
    selectedJob,
    selectedDegree,
    selectedBatch,
    studentData,
    resumeData,
  ]);

  console.log(last7DaysResumesLabels, last7DaysResumes);

  return (
    <div className={styles.chartsection}>
      <div className={styles.chartDiv}>
        <div className={styles.chart}>
          <h3>Registered Students</h3>
          <div className={styles.chartControl}>
            <div className={styles.timeFilter}>
              <button
                className={`${styles.button} ${
                  activeOneOne ? styles.active : ""
                }`}
                onClick={() => {
                  setTimeFilterChartOne("last24Hours");
                }}
              >
                Last 24 Hrs
              </button>
              <button
                className={`${styles.button} ${
                  activeOneTwo ? styles.active : ""
                }`}
                onClick={() => {
                  setTimeFilterChartOne("last7Days");
                }}
              >
                Last Week
              </button>
              <button
                className={`${styles.button} ${
                  activeOneThree ? styles.active : ""
                }`}
                onClick={() => {
                  setTimeFilterChartOne("last31Days");
                }}
              >
                Last Month
              </button>
            </div>
            <div className={styles.range}>
              {labelsChartOne[0] +
                " - " +
                labelsChartOne[labelsChartOne.length - 1]}
            </div>
          </div>
          <LineChart
            xTitle="Time"
            yTitle="Number of Students"
            title="Students Registered"
            labels={labelsChartOne}
            count={countChartOne}
          />
        </div>
        <div className={styles.chart}>
          <h3>Resumes Created</h3>
          <div className={styles.filters}>
            <div className={styles.filter}>
              <label for="jobTitle">Job Title:</label>
              <select
                id="jobTitle"
                onChange={(e) => setSelectedJob(e.target.value)}
                value={selectedJob}
              >
                <option value="">All</option>
                {uniqueJobTitles.map((jobTitle) => (
                  <option value={jobTitle.toLowerCase()}>{jobTitle}</option>
                ))}
              </select>
            </div>
            <div className={styles.filter}>
              <label for="batch">Batch:</label>
              <select
                id="batch"
                onChange={(e) => setSelectedBatch(e.target.value)}
                value={selectedBatch}
              >
                <option value="">All</option>
                {uniqueBatches.map((batch) => (
                  <option value={batch}>{batch}</option>
                ))}
              </select>
            </div>
            <div className={styles.filter}>
              <label for="degree">Degree:</label>
              <select
                id="degree"
                onChange={(e) => setSelectedDegree(e.target.value)}
                value={selectedDegree}
              >
                <option value="">All</option>
                {uniqueDegrees.map((degree) => (
                  <option value={degree?.toLowerCase()}>{degree}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.chartControl}>
            <div className={styles.timeFilter}>
              <button
                className={`${styles.button} ${
                  activeThreeOne ? styles.active : ""
                }`}
                onClick={() => {
                  setTimeFilterChartThree("last24Hours");
                }}
              >
                Last 24 Hrs
              </button>
              <button
                className={`${styles.button} ${
                  activeThreeTwo ? styles.active : ""
                }`}
                onClick={() => {
                  setTimeFilterChartThree("last7Days");
                }}
              >
                Last Week
              </button>
              <button
                className={`${styles.button} ${
                  activeThreeThree ? styles.active : ""
                }`}
                onClick={() => {
                  setTimeFilterChartThree("last31Days");
                }}
              >
                Last Month
              </button>
            </div>
            <div className={styles.range}>
              {labelsChartThree[0] +
                " - " +
                labelsChartThree[labelsChartThree.length - 1]}
            </div>
          </div>
          <LineChart
            xTitle="Time"
            yTitle="Resumes Created"
            title="Resumes Created"
            labels={labelsChartThree}
            count={countChartThree}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
