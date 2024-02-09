export const activities = [
  {
    activityId: "ACT002",
    activityType: "LOGIN",
    description: "User Logged In",
    timestamp: "January 28, 2024 at 15:15:50 UTC+5:30",
    userId: "akaditya394@gmail.com",
  },
  {
    activityId: "ACT003",
    activityType: "CREATE_PROFILE",
    description: "User Created Profile",
    timestamp: "January 28, 2024 at 15:20:00 UTC+5:30",
    userId: "akaditya394@gmail.com",
  },
  {
    activityId: "ACT004",
    activityType: "EDIT_PROFILE",
    description: "User Edited Profile",
    timestamp: "January 28, 2024 at 15:25:15 UTC+5:30",
    userId: "akaditya394@gmail.com",
  },
  {
    activityId: "ACT005",
    activityType: "UPLOAD_RESUME",
    description: "User Uploaded Resume",
    timestamp: "January 28, 2024 at 15:30:30 UTC+5:30",
    userId: "akaditya394@gmail.com",
  },
  {
    activityId: "ACT005",
    activityType: "UPLOAD_RESUME",
    description: "User Uploaded Resume",
    timestamp: "January 28, 2024 at 15:30:30 UTC+5:30",
    userId: "akaditya394@gmail.com",
  },
  {
    activityId: "ACT005",
    activityType: "UPLOAD_RESUME",
    description: "User Uploaded Resume",
    timestamp: "January 28, 2024 at 15:30:30 UTC+5:30",
    userId: "akaditya394@gmail.com",
  },
  {
    activityId: "ACT006",
    activityType: "CREATE_NEW_RESUME",
    description: "User Created New Resume",
    timestamp: "January 28, 2024 at 15:35:45 UTC+5:30",
    userId: "akaditya394@gmail.com",
  },
  {
    activityId: "ACT007",
    activityType: "TAILOR_RESUME_TO_JOB",
    description: "User Tailored Resume to Job",
    timestamp: "January 28, 2024 at 15:40:00 UTC+5:30",
    userId: "akaditya394@gmail.com",
  },
  {
    activityId: "ACT008",
    activityType: "EDIT_RESUME",
    description: "User Edited Resume",
    timestamp: "January 28, 2024 at 15:45:15 UTC+5:30",
    userId: "akaditya394@gmail.com",
  },
  {
    activityId: "ACT009",
    activityType: "DOWNLOAD_RESUME",
    description: "User Downloaded Resume",
    timestamp: "January 28, 2024 at 15:50:30 UTC+5:30",
    userId: "akaditya394@gmail.com",
  },
  {
    activityId: "ACT010",
    activityType: "DELETE_RESUME",
    description: "User Deleted Resume",
    timestamp: "January 28, 2024 at 15:55:45 UTC+5:30",
    userId: "akaditya394@gmail.com",
  },
  {
    activityId: "ACT011",
    activityType: "SIGN_OUT",
    description: "User Signed Out",
    timestamp: "January 28, 2024 at 16:00:00 UTC+5:30",
    userId: "akaditya394@gmail.com",
  },
  {
    activityId: "ACT012",
    activityType: "LOGIN",
    description: "User Logged In",
    timestamp: "January 29, 2024 at 10:15:50 UTC+5:30",
    userId: "john.doe@example.com",
  },
  {
    activityId: "ACT013",
    activityType: "EDIT_PROFILE",
    description: "User Edited Profile",
    timestamp: "January 29, 2024 at 10:20:00 UTC+5:30",
    userId: "john.doe@example.com",
  },
  {
    activityId: "ACT014",
    activityType: "UPLOAD_RESUME",
    description: "User Uploaded Resume",
    timestamp: "January 29, 2024 at 10:25:15 UTC+5:30",
    userId: "john.doe@example.com",
  },
  {
    activityId: "ACT015",
    activityType: "CREATE_NEW_RESUME",
    description: "User Created New Resume",
    timestamp: "January 29, 2024 at 10:30:30 UTC+5:30",
    userId: "john.doe@example.com",
  },
  {
    activityId: "ACT016",
    activityType: "TAILOR_RESUME_TO_JOB",
    description: "User Tailored Resume to Job",
    timestamp: "January 29, 2024 at 10:35:45 UTC+5:30",
    userId: "john.doe@example.com",
  },
  {
    activityId: "ACT017",
    activityType: "EDIT_RESUME",
    description: "User Edited Resume",
    timestamp: "January 29, 2024 at 10:40:00 UTC+5:30",
    userId: "john.doe@example.com",
  },
  {
    activityId: "ACT018",
    activityType: "DOWNLOAD_RESUME",
    description: "User Downloaded Resume",
    timestamp: "January 29, 2024 at 10:45:15 UTC+5:30",
    userId: "john.doe@example.com",
  },
  {
    activityId: "ACT019",
    activityType: "DELETE_RESUME",
    description: "User Deleted Resume",
    timestamp: "January 29, 2024 at 10:50:30 UTC+5:30",
    userId: "john.doe@example.com",
  },
  {
    activityId: "ACT020",
    activityType: "SIGN_OUT",
    description: "User Signed Out",
    timestamp: "January 29, 2024 at 11:00:00 UTC+5:30",
    userId: "john.doe@example.com",
  },
];

const parseTimestamp = (timestampString) => {
  const timestamp = timestampString.replace(" at ", " ");
  return new Date(timestamp);
};

const sortedActivities = activities.sort((a, b) => {
  const dateA = parseTimestamp(a.timestamp);
  const dateB = parseTimestamp(b.timestamp);

  if (dateA > dateB) return -1;
  if (dateA < dateB) return 1;
  return 0;
});

function convertTimestampsInArray(arrayOfObjects) {
  return arrayOfObjects.map((obj) => {
    const newObj = { ...obj };

    const timestampParts = obj.timestamp.split(" at ");
    const date = timestampParts[0];
    const time = timestampParts[1].split(" ")[0];

    newObj.date = date;
    newObj.time = time;
    delete newObj.timestamp;

    return newObj;
  });
}

export const convertedArrayOfActivities =
  convertTimestampsInArray(sortedActivities);
