import moment from "moment";
import { Timestamp } from "firebase/firestore";

// Function to merge date and time into a single timestamp
export const mergeDateAndTime = (date, time) => {
  console.log(date, time, "Merge function");
  if (!date || !time) return null;

  const dateString = moment(date).format("YYYY-MM-DD");
  const timeMoment = moment(time, "HH:mm", true);

  if (!timeMoment.isValid()) {
    console.error("Invalid time format:", time);
    return null;
  }

  const dateTimeString = `${dateString} ${timeMoment.format("HH:mm")}`;
  const firebaseTimestamp = Timestamp.fromDate(
    moment(dateTimeString, "YYYY-MM-DD HH:mm").toDate()
  );

  console.log(firebaseTimestamp, "Merged date and time.");
  return firebaseTimestamp;
};
