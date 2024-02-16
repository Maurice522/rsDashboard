import { activities } from "./dummyactivities";

function getActivityTypeCounts(activities) {
  const activityTypeCounts = {};

  activities.forEach((activity) => {
    activityTypeCounts[activity.activityType] =
      (activityTypeCounts[activity.activityType] || 0) + 1;
  });

  const result = Object.keys(activityTypeCounts).map((activity) => ({
    activity,
    total: activityTypeCounts[activity],
  }));

  return result;
}

export const uniqueActivityTypesAndCounts = getActivityTypeCounts(activities);
