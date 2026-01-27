export function timeAgo(timestamp: number | string | bigint): string {
  const ts = Number(timestamp) * 1000; // seconds → ms
  const now = Date.now();
  const diff = now - ts;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 5) return `${weeks} week ago`;
  if (months < 12) return `${months} month ago`;

  return `${years} yr ago`;
}
