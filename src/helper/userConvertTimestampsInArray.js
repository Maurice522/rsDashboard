import { convertTimestampToString } from "./convertTimestampToString";

export function convertTimestampsInArray(arrayOfObjects) {
  return arrayOfObjects.map((obj) => {
    const newObj = { ...obj };
    const timestampString = convertTimestampToString(obj?.timestamp);
    const timestampParts = timestampString?.split(" at ");
    const date = timestampParts[0];
    const time = timestampParts[1]?.split(" ")[0];

    newObj.date = date;
    newObj.time = time;
    newObj.timestamp = obj.timestamp;

    return newObj;
  });
}
