export const DateToDateString = (date?: Date) => {
  // Convert Date to date string with dd/mm/yyyy
  if (!date) return "-";

  try {
    return (
      date?.getDate() + "/" + (date?.getMonth() + 1) + "/" + date?.getFullYear()
    );
  } catch {
    return "-";
  }
};
