import { convertTimestampToString } from "./convertTimestampToString";

export function calculateIncreaseInLastWeek(objectsArray) {
  const now = new Date();
  const lastWeekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastToLastWeekStart = new Date(
    now.getTime() - 14 * 24 * 60 * 60 * 1000
  );

  const countLastWeek = objectsArray
    ?.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.email === obj.email)
    )
    .filter((obj) => {
      const timestampString = convertTimestampToString(obj?.timestamp);
      const timestamp = new Date(timestampString.split(" at ")[0]);
      return timestamp >= lastWeekStart && timestamp <= now;
    }).length;

  const countLastToLastWeek = objectsArray
    ?.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.email === obj.email)
    )
    ?.filter((obj) => {
      const timestampString = convertTimestampToString(obj?.timestamp);
      const timestamp = new Date(timestampString.split(" at ")[0]);
      return timestamp >= lastToLastWeekStart && timestamp < lastWeekStart;
    }).length;

  console.log(countLastWeek, countLastToLastWeek);

  if (countLastToLastWeek === 0) {
    return {
      percentageChange: countLastWeek,
      changeStatus: "Increase",
    };
  }

  const increaseCount = countLastWeek - countLastToLastWeek;
  const percentageChange = (
    (increaseCount / countLastToLastWeek) *
    100
  ).toFixed(2);

  let changeStatus = "No change";
  if (increaseCount > 0) {
    changeStatus = "Increase";
  } else if (increaseCount < 0) {
    changeStatus = "Decrease";
  }

  return {
    percentageChange: percentageChange + "%",
    changeStatus: changeStatus,
  };
}

export function calculateIncreaseInTotalStudentsSinceLastWeek(array) {
  const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
  const presentTime = new Date().getTime();
  const oneWeekAgo = presentTime - millisecondsInWeek;

  const presentLength = array.filter(
    (item) =>
      item.timestamp.seconds * 1000 + item.timestamp.nanoseconds / 1e6 >=
      oneWeekAgo
  ).length;
  const oneWeekAgoLength = array.filter(
    (item) =>
      item.timestamp.seconds * 1000 + item.timestamp.nanoseconds / 1e6 <
      oneWeekAgo
  ).length;

  if (oneWeekAgoLength === 0) {
    return {
      percentageChange: 0,
      changeStatus: "Increase",
    };
  }

  const percentageChange =
    ((presentLength - oneWeekAgoLength) / oneWeekAgoLength) * 100;

  let changeStatus = "";
  if (percentageChange > 0) {
    changeStatus = "increase";
  } else if (percentageChange < 0) {
    changeStatus = "decrease";
  } else {
    changeStatus = "no change";
  }

  return {
    percentageChange: percentageChange.toFixed(2) + "%",
    changeStatus: changeStatus,
  };
}
