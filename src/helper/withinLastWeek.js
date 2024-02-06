export function countWithinOneWeek(objects) {
  const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
  const now = new Date();

  const oneWeekAgo = new Date(now.getTime() - oneWeekInMillis);

  const count = objects.reduce((acc, obj) => {
    const timestamp = new Date(obj.timestamp.replace(" at ", " "));

    if (!isNaN(timestamp) && timestamp >= oneWeekAgo && timestamp <= now) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return count;
}
