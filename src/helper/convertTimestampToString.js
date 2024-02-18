export function convertTimestampToString(timestamp) {
  const totalMilliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;

  const date = new Date(totalMilliseconds);

  const formattedString =
    date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "UTC",
    }) + "+5:30UTC";

  return formattedString;
}
