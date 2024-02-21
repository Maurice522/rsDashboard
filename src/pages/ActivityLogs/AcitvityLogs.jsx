import React, { useEffect, useState } from "react";
import DynamicTableComponent from "../../components/Table/DynamicTable";
import styles from "./ActivityLogs.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import LineChart from "../../components/LineChart/LineChart";
import { getActivityTypeCounts } from "../../helper/ActivityData";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import { convertTimestampsInArray } from "../../helper/userConvertTimestampsInArray";

const AcitvityLogs = () => {
  const [activities, setActivities] = useState([]);
  const [range, setRange] = useState("");
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [timeFilter, setTimeFilter] = useState("lastmonth");
  const [activeOne, setActiveOne] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(true);

  console.log(filteredActivities);

  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function filterObjectsWithinLast24Hours(array) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const filteredObjects = array.filter((obj) => {
      const objDate = new Date(obj.date);
      return objDate > twentyFourHoursAgo;
    });
    return {
      filteredObjects,
      dateRange: {
        startDate: formatDate(twentyFourHoursAgo),
        endDate: formatDate(new Date()),
      },
    };
  }

  function filterObjectsWithinLastWeek(array) {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const filteredObjects = array.filter((obj) => {
      const objDate = new Date(obj.date);
      return objDate > oneWeekAgo;
    });
    return {
      filteredObjects,
      dateRange: {
        startDate: formatDate(oneWeekAgo),
        endDate: formatDate(new Date()),
      },
    };
  }

  function filterObjectsWithinLastMonth(array) {
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const filteredObjects = array.filter((obj) => {
      const objDate = new Date(obj.date);
      return objDate > oneMonthAgo;
    });
    return {
      filteredObjects,
      dateRange: {
        startDate: formatDate(oneMonthAgo),
        endDate: formatDate(new Date()),
      },
    };
  }

  useEffect(() => {
    const fetchActivityData = async () => {
      const docRef = doc(db, "meta", "activityLog");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setActivities(convertTimestampsInArray(docSnap?.data()?.activities));
      } else {
        toast.error("Activity data missing!");
      }
    };
    fetchActivityData();
  }, []);

  useEffect(() => {
    if (timeFilter === "24hours") {
      setActiveOne(true);
      setActiveTwo(false);
      setActiveThree(false);
      const { dateRange, filteredObjects } =
        filterObjectsWithinLast24Hours(activities);
      setFilteredActivities(filteredObjects);
      setRange(`${dateRange.startDate} - ${dateRange.endDate}`);
    } else if (timeFilter === "lastweek") {
      setActiveOne(false);
      setActiveTwo(true);
      setActiveThree(false);
      const { dateRange, filteredObjects } =
        filterObjectsWithinLastWeek(activities);
      setFilteredActivities(filteredObjects);
      setRange(`${dateRange.startDate} - ${dateRange.endDate}`);
    } else if (timeFilter === "lastmonth") {
      setActiveOne(false);
      setActiveTwo(false);
      setActiveThree(true);
      const { dateRange, filteredObjects } =
        filterObjectsWithinLastMonth(activities);
      setFilteredActivities(filteredObjects);
      setRange(`${dateRange.startDate} - ${dateRange.endDate}`);
    }
  }, [timeFilter, activities]);

  console.log(activities);

  const uniqueActivityTypesAndCounts =
    getActivityTypeCounts(filteredActivities);

  const linelabels = uniqueActivityTypesAndCounts.map(
    (uniqueActivity) => uniqueActivity.activity
  );

  const uniqueActivityCount = uniqueActivityTypesAndCounts.map(
    (uniqueActivity) => uniqueActivity.total
  );

  console.log(uniqueActivityTypesAndCounts);

  const parseTimestamp = (timestampString) => {
    const timestamp = timestampString.replace(" at ", " ");
    return new Date(timestamp);
  };

  const sortedActivities = activities.sort((a, b) => {
    const dateA = parseTimestamp(a.date);
    const dateB = parseTimestamp(b.date);

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });

  return (
    <main>
      <Navbar />
      <div className={styles.acitvityLogs}>
        <Sidebar />
        <div className={styles.log}>
          <div className={styles.activityTable}>
            <h3>Actvity Logs</h3>
            <DynamicTableComponent data={sortedActivities} />
          </div>
          <div className={styles.middleContainer}>
            <h3>Activities</h3>
            <div className={styles.activityData}>
              <div className={styles.chart}>
                <div className={styles.chartControl}>
                  <div className={styles.buttonContainer}>
                    <button
                      className={`${styles.button} ${
                        activeOne && styles.active
                      }`}
                      onClick={() => setTimeFilter("24hours")}
                    >
                      24 hours
                    </button>
                    <button
                      className={`${styles.button} ${
                        activeTwo && styles.active
                      }`}
                      onClick={() => setTimeFilter("lastweek")}
                    >
                      Last Week
                    </button>
                    <button
                      className={`${styles.button} ${
                        activeThree && styles.active
                      }`}
                      onClick={() => setTimeFilter("lastmonth")}
                    >
                      Last Month
                    </button>
                  </div>
                  <div className={styles.dateRange}>{range}</div>
                </div>
                <LineChart
                  xTitle="Activities"
                  yTitle="Number of Students"
                  labels={linelabels}
                  count={uniqueActivityCount}
                />
              </div>
              <div className={styles.bottomContainer}>
                <DynamicTableComponent
                  data={uniqueActivityTypesAndCounts.sort(
                    (a, b) => b.total - a.total
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AcitvityLogs;
