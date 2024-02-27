import { convertTimestampToString } from "./convertTimestampToString";

export function getUsersCountByHour(dataArray) {
  const currentTimestamp = new Date();
  const hourInMillis = 60 * 60 * 1000;
  const userCountsByHour = Array(24).fill(0);
  dataArray.forEach((user) => {
    const timestampString = convertTimestampToString(user.timestamp);
    const userTimestamp = new Date(timestampString.replace(/at/, ""));
    const hoursAgo = Math.floor(
      (currentTimestamp - userTimestamp) / hourInMillis
    );

    if (hoursAgo >= 0 && hoursAgo < 24) {
      userCountsByHour[hoursAgo]++;
    }
  });

  const result = userCountsByHour
    .map((count, index) => ({
      hour: index,
      count,
    }))
    .reverse();
  return result;
}

export function getUsersCountByMonth(dataArray) {
  const currentTimestamp = new Date();
  const userCountsByDay = {};

  for (let i = 0; i < 31; i++) {
    const date = new Date(currentTimestamp);
    date.setDate(date.getDate() - i);
    userCountsByDay[date.toDateString()] = 0;
  }

  dataArray.forEach((user) => {
    const timestampString = convertTimestampToString(user.timestamp);
    const userTimestamp = new Date(timestampString.replace(/at/, ""));
    const daysAgo = Math.floor(
      (currentTimestamp - userTimestamp) / (24 * 60 * 60 * 1000)
    );
    if (daysAgo >= 0 && daysAgo < 31) {
      const dateKey = userTimestamp.toDateString();
      userCountsByDay[dateKey]++;
    }
  });

  const result = Object.entries(userCountsByDay)
    .map(([date, count]) => ({
      date: date.substring(0, date.length - 4),
      count,
    }))
    .reverse();
  return result;
}

export function getUsersCountByWeek(dataArray) {
  const currentTimestamp = new Date();
  const weekInMillis = 7 * 24 * 60 * 60 * 1000;
  const userCountsByDate = {};

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentTimestamp - i * 24 * 60 * 60 * 1000);
    userCountsByDate[date.toDateString()] = 0;
  }

  dataArray.forEach((user) => {
    // console.log(user);
    const timestampString = convertTimestampToString(user.timestamp);
    const userTimestamp = new Date(timestampString.replace(/at/, ""));
    const daysAgo = Math.floor(
      (currentTimestamp - userTimestamp) / (24 * 60 * 60 * 1000)
    );

    if (daysAgo >= 0 && daysAgo < 7) {
      const dateKey = userTimestamp.toDateString();
      userCountsByDate[dateKey]++;
    }
  });

  const result = Object.entries(userCountsByDate)
    .map(([date, count]) => ({
      date,
      count,
    }))
    .reverse();
  return result;
}
