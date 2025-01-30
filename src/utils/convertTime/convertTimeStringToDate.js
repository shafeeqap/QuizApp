export const convertTimeStringToDate = (timeStr) => {
    if (!timeStr) return null;
  
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  };