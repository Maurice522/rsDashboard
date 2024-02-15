import { last31DaysResumeData } from "./last31DaysData";

export function extractUniqueJobTitles(data) {
  const uniqueJobTitles = [];
  data.forEach((entry) => {
    if (!uniqueJobTitles.includes(entry.jobTitle)) {
      uniqueJobTitles.push(entry.jobTitle);
    }
  });

  return uniqueJobTitles;
}

function extractUniqueJobTitlesAndCount(data) {
  const jobTitlesInfo = [];
  data.forEach((entry) => {
    const index = jobTitlesInfo.findIndex(
      (item) => item.jobTitle === entry.jobTitle
    );

    if (index === -1) {
      jobTitlesInfo.push({ jobTitle: entry.jobTitle, count: 1 });
    } else {
      jobTitlesInfo[index].count++;
    }
  });

  return jobTitlesInfo;
}

export const jobTitlesInfo =
  extractUniqueJobTitlesAndCount(last31DaysResumeData);
