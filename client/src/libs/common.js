import * as moment from 'moment';

export const objectToArray = (obj) => {
  return Object.keys(obj).map(key => obj[key])
}

// Returns date time in this format - January 14th 2013 2:08 PM
export const dateTimeFormatter = (datetime) => {
  return moment(datetime).format('MMM DD').toUpperCase();
}
