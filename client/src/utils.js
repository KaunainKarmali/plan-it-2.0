import moment from "moment";

// Extracts the values from rgba function: rgba(255, 255, 255) returns 255, 255, 255
export const getRGBvalue = (rgbFunction) => {
  return rgbFunction.split("rgb(")[1].split(")")[0];
};

// Gets the date for today and returns it in the format YYYY-MM-DD
export const getTodaysDate = () => {
  const date = new Date();

  const year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString(); // add 1 as Jan is 0
  let day = date.getDate().toString();

  if (month.length < 2) {
    month = "0" + month;
  }

  if (day.length < 2) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
};

// Formats date to YYYY-MM-DD
export const formatDate = (rawDate) => {
  const date = new Date(rawDate);

  const year = date.getUTCFullYear().toString();
  let month = (date.getUTCMonth() + 1).toString(); // add 1 as Jan is 0
  let day = date.getUTCDate().toString();

  if (month.length < 2) {
    month = "0" + month;
  }

  if (day.length < 2) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
};

// Format duration
export const formatDuration = (counter) => {
  const duration = moment.duration(counter, "s");

  const seconds =
    duration.seconds() < 10
      ? `0${duration.seconds()}s`
      : `${duration.seconds()}s`;
  const minutes =
    duration.minutes() < 10
      ? `0${duration.minutes()}m`
      : `${duration.minutes()}m`;
  const hours =
    duration.hours() < 10 ? `0${duration.hours()}h` : `${duration.hours()}h`;
  const days = `${duration.days()}d`;

  if (duration.days() > 0) {
    return `${days}:${hours}:${minutes}:${seconds}`;
  } else if (duration.hours() > 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else if (duration.minutes() > 0) {
    return `${minutes}:${seconds}`;
  } else {
    return `${seconds}`;
  }
};
