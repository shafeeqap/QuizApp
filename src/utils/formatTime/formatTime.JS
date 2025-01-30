export const formatTime = (time) => {
  let hours, minutes, day, month, year;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (typeof time === "string") {
    // Handle time string like "20:00"
    [hours, minutes] = time.split(":").map(Number);
  } else if (time?.seconds) {
    const date = new Date(time.seconds * 1000);
    hours = date.getHours();
    minutes = date.getMinutes();
    day = date.getDate();
    month = monthNames[date.getMonth()];
    year = date.getFullYear();
  } else {
    return "Invalid time";
  }

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  const formattedDay = day ? day.toString().padStart(2, "0") : "??";
  const formattedMonth = month || "??";
  const formattedYear = year || "????";

  return `${formattedHours}:${
    minutes?.toString().padStart(2, "0") || "00"
  } ${period} : ${formattedDay}-${formattedMonth}-${formattedYear}`;
};
