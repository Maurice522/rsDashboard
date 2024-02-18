// import React, { useEffect, useState } from "react";
// import DynamicTableComponent from "../components/Table/DynamicTable";
// import styles from "./ActivityLogs.module.css";
// import Sidebar from "../components/Sidebar/Sidebar";
// import Navbar from "../components/Navbar/Navbar";
// import LineChart from "../components/LineChart/LineChart";
// import {
//   getActivityTypeCounts,
//   uniqueActivityTypesAndCounts,
// } from "../dummyData/ActivityData";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import toast from "react-hot-toast";
// import { convertTimestampsInArray } from "../dummyData/last31DaysData";
// import { convertTimestampToString } from "../helper/convertTimestampToString";

// const AcitvityLogs = () => {
//   const [activities, setActivities] = useState([]);

//   function countObjectsByDate(data) {
//     const dateCountMap = {};

//     data.forEach((item) => {
//       const timestampString = convertTimestampToString(item.timestamp);
//       const date = timestampString.split(" at ")[0];
//       dateCountMap[date] = (dateCountMap[date] || 0) + 1;
//     });

//     const countArray = Object.keys(dateCountMap).map((date) => ({
//       date,
//       count: dateCountMap[date],
//     }));

//     return countArray;
//   }

//   function getObjectsCountByWeek(dataArray) {
//     const currentTimestamp = new Date();
//     const weekInMillis = 7 * 24 * 60 * 60 * 1000;
//     const objectCountsByDate = {};

//     for (let i = 0; i < 7; i++) {
//       const date = new Date(currentTimestamp - i * 24 * 60 * 60 * 1000);
//       objectCountsByDate[date.toDateString()] = 0;
//     }

//     dataArray.forEach((object) => {
//       const timestampString = convertTimestampToString(object.timestamp);
//       const userTimestamp = new Date(timestampString.replace(/at/, ""));
//       const daysAgo = Math.floor(
//         (currentTimestamp - userTimestamp) / (24 * 60 * 60 * 1000)
//       );

//       if (daysAgo >= 0 && daysAgo < 7) {
//         const dateKey = userTimestamp.toDateString();
//         objectCountsByDate[dateKey]++;
//       }
//     });

//     const result = Object.entries(objectCountsByDate).map(([date, count]) => ({
//       date,
//       count,
//     }));
//     return result;
//   }

//   function getObjectsCountByHour(dataArray) {
//     const currentTimestamp = new Date();
//     const hourInMillis = 60 * 60 * 1000;
//     const objectCountsByHour = Array(24).fill(0);
//     dataArray.forEach((object) => {
//       const timestampString = convertTimestampToString(object.timestamp);
//       const objectTimestamp = new Date(timestampString.replace(/at/, ""));
//       const hoursAgo = Math.floor(
//         (currentTimestamp - objectTimestamp) / hourInMillis
//       );

//       if (hoursAgo >= 0 && hoursAgo < 24) {
//         objectCountsByHour[hoursAgo]++;
//       }
//     });

//     const result = objectCountsByHour.map((count, index) => ({
//       hour: index,
//       count,
//     }));
//     return result;
//   }

//   useEffect(() => {
//     const fetchActivityData = async () => {
//       const docRef = doc(db, "meta", "activityLog");
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setActivities(convertTimestampsInArray(activities));
//       } else {
//         toast.error("Activity data missing!");
//       }
//     };
//     fetchActivityData();
//   }, []);

//   console.log(activities);

//   const last7DaysActivitiesLabels = getObjectsCountByWeek(activities).map(
//     (day) => day.date.substring(0, day.date.length - 4)
//   );

//   const last7DaysActivities = getObjectsCountByWeek(activities).map(
//     (day) => day.count
//   );

//   const last31DaysActivitiesLabels = countObjectsByDate(activities).map(
//     (day) => day.date.split(", ")[0]
//   );

//   const last31DaysActivities = countObjectsByDate(activities).map(
//     (day) => day.count
//   );

//   const last24HoursActivitiesLabels = getObjectsCountByHour(activities).map(
//     (data) => data.hour.toString() + " Hours Ago"
//   );

//   const last24HoursActivities = getObjectsCountByHour(activities).map(
//     (data) => data.count
//   );

//   const [timeFilter, setTimeFilter] = useState("lastmonth");
//   const [activeOne, setActiveOne] = useState(false);
//   const [activeTwo, setActiveTwo] = useState(false);
//   const [activeThree, setActiveThree] = useState(true);
//   const [labels, setLabels] = useState([]);
//   const [count, setCount] = useState([]);

//   useEffect(() => {
//     if (timeFilter === "24hours") {
//       setActiveOne(true);
//       setActiveTwo(false);
//       setActiveThree(false);
//       setLabels(last24HoursActivitiesLabels);
//       setCount(last24HoursActivities);
//     } else if (timeFilter === "lastweek") {
//       setActiveOne(false);
//       setActiveTwo(true);
//       setActiveThree(false);
//       setLabels(last7DaysActivitiesLabels);
//       setCount(last7DaysActivities);
//     } else if (timeFilter === "lastmonth") {
//       setActiveOne(false);
//       setActiveTwo(false);
//       setActiveThree(true);
//       setLabels(last31DaysActivitiesLabels);
//       setCount(last31DaysActivities);
//     }
//   }, [
//     timeFilter,
//     last24HoursActivities,
//     last24HoursActivitiesLabels,
//     last31DaysActivities,
//     last31DaysActivitiesLabels,
//     last7DaysActivities,
//     last7DaysActivitiesLabels,
//   ]);

//   const uniqueActivityTypesAndCounts = getActivityTypeCounts(activities);

//   return (
//     <main>
//       <Navbar />
//       <div className={styles.acitvityLogs}>
//         <Sidebar />
//         <div className={styles.log}>
//           <div className={styles.activityTable}>
//             <h3>Actvity Logs</h3>
//             <DynamicTableComponent
//               data={convertTimestampsInArray(activities)}
//             />
//           </div>
//           <div className={styles.middleContainer}>
//             <h3>Activities</h3>
//             <div className={styles.activityData}>
//               <div className={styles.chart}>
//                 <div className={styles.buttonContainer}>
//                   <button
//                     className={`${styles.button} ${activeOne && styles.active}`}
//                     onClick={() => setTimeFilter("24hours")}
//                   >
//                     24 hours
//                   </button>
//                   <button
//                     className={`${styles.button} ${activeTwo && styles.active}`}
//                     onClick={() => setTimeFilter("lastweek")}
//                   >
//                     Last Week
//                   </button>
//                   <button
//                     className={`${styles.button} ${
//                       activeThree && styles.active
//                     }`}
//                     onClick={() => setTimeFilter("lastmonth")}
//                   >
//                     Last Month
//                   </button>
//                 </div>
//                 <LineChart
//                   xTitle="Activities"
//                   yTitle="Number of Students"
//                   labels={labels}
//                   count={count}
//                 />
//               </div>
//               <div className={styles.bottomContainer}>
//                 <DynamicTableComponent
//                   data={uniqueActivityTypesAndCounts.sort(
//                     (a, b) => b.total - a.total
//                   )}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default AcitvityLogs;

import React, { useEffect, useState } from "react";
import DynamicTableComponent from "../components/Table/DynamicTable";
import styles from "./ActivityLogs.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import LineChart from "../components/LineChart/LineChart";
import { getActivityTypeCounts } from "../dummyData/ActivityData";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";
import { convertTimestampsInArray } from "../dummyData/last31DaysData";

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
