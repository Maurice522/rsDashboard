export function convertTimestampToString(timestamp) {
  const totalMilliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;

  const date = new Date(totalMilliseconds);
  const formattedString = formatDateString(date);

  return formattedString;
}

function formatDateString(date) {
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date
    .getUTCDate()
    .toString()
    .padStart(2, "0")} at ${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
  return formattedDate;
}
