function toDate(timestamp) {
  const { seconds, nanoseconds } = timestamp;
  return new Date(seconds * 1000 + nanoseconds / 1000000);
}

export function filterLastMonth(objects) {
  const now = new Date();
  const lastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );
  return objects.filter((obj) => toDate(obj.timestamp) >= lastMonth);
}

export function filterLastWeek(objects) {
  const now = new Date();
  const lastWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7
  );
  return objects.filter((obj) => toDate(obj.timestamp) >= lastWeek);
}

export function filterLast24Hours(objects) {
  const now = new Date();
  const last24Hours = new Date(now - 24 * 60 * 60 * 1000);
  return objects.filter((obj) => toDate(obj.timestamp) >= last24Hours);
}
