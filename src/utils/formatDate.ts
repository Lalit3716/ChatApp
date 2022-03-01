export default (date: Date): string => {
  const parsed = new Date(date);
  const hours = parsed.getHours();
  const minutes = parsed.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  const hoursFormatted = hours % 12 === 0 ? 12 : hours % 12;
  return `${hoursFormatted}:${minutes} ${ampm}`;
};
