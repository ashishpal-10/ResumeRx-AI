const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

export const formatRelativeTime = (value) => {
  if (!value) return "Unknown date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Unknown date";

  const now = new Date();
  const elapsed = now.getTime() - date.getTime();

  if (elapsed < MINUTE) return "Just now";

  if (elapsed < HOUR) {
    const minutes = Math.floor(elapsed / MINUTE);

    return `${minutes}m ago`;
  }

  if (elapsed < DAY) {
    const hours = Math.floor(elapsed / HOUR);

    return `${hours}h ago`;
  }

  const dayDiff = Math.round(
    (startOfDay(now) - startOfDay(date)) / DAY
  );

  if (dayDiff === 1) return "Yesterday";

  if (dayDiff < 7) return `${dayDiff} days ago`;

  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const getHealthLabel = (score) => {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Good";
  if (score >= 40) return "Needs Work";

  return "Weak";
};
