import * as Dates from "@/libs/dates";
import * as Time from "@/libs/time";

const SEPARATOR = " — ";
const OFFSET = 1296e2;

export const extract = (title) => {
  const segments = title.split(SEPARATOR);
  const raw = segments[segments.length - 1];
  return Dates.parse(raw);
};

export const passed = (date, now = new Date()) => Time.standardize(now) >= Time.standardize(date) + OFFSET;
