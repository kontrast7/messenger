export const dayMonthYearDateParse = (date: string) => {
  return new Date(date).toString().slice(0, 10);
};

export const hoursMinutesDateParse = (date: string) => {
  return new Date(date).toString().slice(15, 21);
};
