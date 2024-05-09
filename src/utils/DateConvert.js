// convert string date to dayjs

import dayjs from "dayjs";
import moment from "moment";

export const convertStringToDateJS = (strDate) => {
  const dateObject = moment(strDate, "ddd MMM DD YYYY").toDate();
  const parsedDate = new Date(dateObject).toString();
  return dayjs(parsedDate);
};

export const convertStringTimeToDateJS = (strTime) => {
  const timeObject = moment(strTime, "HH:mm:ss").toDate();
  const parsedTime = new Date(timeObject).toString();
  return dayjs(parsedTime);
};


export function formatDate(dateString) {
  const date = moment(dateString);
  const formattedDate = date.format("ddd MMM DD YYYY [at] HH:mm");
  return formattedDate;
}

export function formatTime(timeString) {
  const time = moment(timeString);
  const formattedTime = time.format("HH:mm");
  return formattedTime;
}

export function formatOnlyDate(dateString) {
  const date = moment(dateString);
  const formattedDate = date.format("ddd MMM DD YYYY");
  return formattedDate;
}


//validate date in dayjs 2 date

export const validateDate = (startDate, endDate) => {
  return start.isBefore(end);
}