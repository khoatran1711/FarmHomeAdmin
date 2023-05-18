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

export const DateToStringAPI = (date?: Date) => {
  if (!date) return "-";

  try {
    return (
      date?.getFullYear() +
      "-" +
      (date?.getMonth() + 1 < 10
        ? "0" + (date?.getMonth() + 1)
        : date?.getMonth() + 1) +
      "-" +
      (date?.getDate() < 10 ? "0" + date?.getDate() : date?.getDate())
    );
  } catch {
    return "-";
  }
};

export const DateStringAPIToString = (date?: string) => {
  // Convert yyyy-mm-dd to date string with dd/mm/yyyy

  if (!date) return "-";

  try {
    const split = date?.split("-");

    return split[2] + "/" + split[1] + "/" + split[0];
  } catch {
    return "-";
  }
};
