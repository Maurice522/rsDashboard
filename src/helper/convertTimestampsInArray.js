export const parseTimestamp = (timestampString) => {
  const timestamp = timestampString.replace(" at ", " ");
  return new Date(timestamp);
};

export function convertTimestampsInArray(arrayOfObjects) {
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
