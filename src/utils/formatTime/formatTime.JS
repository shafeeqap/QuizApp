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

    const today = new Date();
    day = today.getDate();
    month = today.getMonth() + 1;
    year = today.getFullYear();
  } else if (time?.seconds) {
    const date = new Date(time.seconds * 1000);
    hours = date.getHours();
    minutes = date.getMinutes();
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
  } else {
    return "Invalid time";
  }

  // Convert to 12-hour format
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formatedMonths = month < 10 ? `0${month}` : month;

  return `${formattedHours}:${formattedMinutes} ${period} - ${day}-${formatedMonths}-${year}`;
};
