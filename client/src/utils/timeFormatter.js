export function convertSecondsToDuration(totalSeconds) {
  if (!totalSeconds || isNaN(totalSeconds)) return "0m";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = "";
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m`;
  if (seconds > 0) result += `${Math.floor(seconds)}s`;

  return result.trim();
}
