import { activities } from "../ActivityLogs/dummyactivities";

function getActivityTypeCounts(activities) {
  const activityTypeCounts = {};

  activities.forEach((activity) => {
    activityTypeCounts[activity.activityType] =
      (activityTypeCounts[activity.activityType] || 0) + 1;
  });

  const result = Object.keys(activityTypeCounts).map((activityType) => ({
    activityType,
    count: activityTypeCounts[activityType],
  }));

  return result;
}

export const uniqueActivityTypesAndCounts = getActivityTypeCounts(activities);
