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
