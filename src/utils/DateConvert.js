// convert string date to dayjs

import dayjs from "dayjs";
import moment from "moment";

export const convertStringToDateJS = (strDate) => {
  const dateObject = moment(strDate, "ddd MMM DD YYYY").toDate();
  const parsedDate = new Date(dateObject).toString();
  console.log(parsedDate);
  return dayjs(parsedDate);
};

export const convertStringTimeToDateJS = (strTime) => {
  const timeObject = moment(strTime, "HH:mm:ss").toDate();
  const parsedTime = new Date(timeObject).toString();
  console.log(parsedTime);
  return dayjs(parsedTime);
};
