import * as Base from "@/templates/base";
import * as Time from "@/libs/time";
import Data from "@/messages/dates";

const color = 0x0099ff;

const label = (date) =>
  date.toLocaleDateString("en-EN", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

const next = ({ date }) => {
  const timestamp = Time.standardize(date);
  return `**Next date:** <t:${timestamp}:D> (<t:${timestamp}:R>)`;
};

const item = ({ date, url }) => `• [${label(date)}](${url})`;

export const build = (upcoming) => {
  const { title, empty } = Data;

  if (!upcoming.length) return Base.message({ color, title, description: empty });

  const sorted = [...upcoming].sort((a, b) => a.date - b.date);
  const description = [next(sorted[0]), "", ...sorted.map(item)].join("\n");

  return Base.message({ color, title, description });
};
