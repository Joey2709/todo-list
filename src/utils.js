import { format, compareDesc, parseISO, toDate } from "date-fns";

function resultFromDates(date1, date2) {
  if (compareDesc(toDate(parseISO(date1)), toDate(parseISO(date2))) == 1) {
    return `<span class="status-updated">Updated</span> ${format(
      parseISO(date2),
      "LLL dd, yyyy, hh:mm bbbb"
    )}`;
  }
  return `<span class="status-created">Created</span> ${format(
    parseISO(date1),
    "LLL dd, yyyy, hh:mm bbbb"
  )}`;
}

function idGenerator() {
  const uuid = require("uuid");
  return uuid.v4();
}

export { resultFromDates, idGenerator };
