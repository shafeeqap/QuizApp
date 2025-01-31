import { Timestamp } from "firebase/firestore";

// Function to merge date and time into a single timestamp
export const mergeDateAndTime = (date, time) => {
  if (!date || !time) return null;

  const dateString = new Date(date).toLocaleDateString("en-CA");

  let timeString;
  if (typeof time === "string") {
    timeString = time;
  } else if (time instanceof Date) {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    timeString = `${hours}:${minutes}`;
  } else {
    console.error("Invalid time format:", time);
    return null;
  }

  const dateTimeString = `${dateString}T${timeString}:00`;
  const finalDate = new Date(dateTimeString);

  if (isNaN(finalDate.getTime())) {
    console.error("Invalid date/time:", dateTimeString);
    return null;
  }
  const firebaseTimestamp = Timestamp.fromDate(finalDate);

  return firebaseTimestamp;
};
