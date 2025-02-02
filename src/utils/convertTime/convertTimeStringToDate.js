export const convertTimeStringToDate = (timeStr) => {
    if (!timeStr) return null;
  
    const [hours, minutes] = new Date(timeStr.seconds * 1000).toISOString().split("T")[0];
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  };