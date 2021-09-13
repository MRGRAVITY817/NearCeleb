export const prettyDate = (dateString: string) => {
  if (!dateString || dateString.length === 0) return `N/A`;
  const newDate = new Date(dateString);
  const newMonth = prettyMonth(newDate);
  const newDay = prettyDay(newDate);
  const newYear = newDate.getFullYear();
  return `${newMonth} ${newDay}, ${newYear}`;
};

export const prettyDay = (date: Date) => {
  const dayString = date.getDate().toString();
  if (dayString.slice(-1) === "1") return `${dayString}st`;
  else if (dayString.slice(-1) === "2") return `${dayString}nd`;
  else if (dayString.slice(-1) === "3") return `${dayString}rd`;
  else return `${dayString}th`;
};

export const prettyMonth = (date: Date, lowerCase: boolean = false) => {
  const monthArray = [
    "January",
    "Feburary",
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
  const monthIndex = date.getMonth();
  return !lowerCase
    ? monthArray[monthIndex]
    : monthArray[monthIndex].toLowerCase();
};

export const getFormattedDate = (inputDate: Date) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = `0${1 + date.getMonth()}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

export const getDdayFromDate = (inputDate: Date) => {
  const date = new Date(inputDate);
  const now = new Date();
  const thisYearBirth = new Date(
    now.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const gap = thisYearBirth.getTime() - now.getTime();
  const dayLeft = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
  if (dayLeft < 0) {
    return `${dayLeft}`;
  }
  return `+${dayLeft}`;
};

export const dbDate = (data: Date) => {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate());
};
