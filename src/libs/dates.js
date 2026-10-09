const MONTHS = Array.from({ length: 12 }, (_, month) =>
  new Date(Date.UTC(2000, month, 1)).toLocaleDateString("en-EN", { month: "long" }).toLowerCase()
);

const REGEX = /^([a-z]+)\s+(\d{1,2}),\s*(\d{4})$/i;

export const parse = (text) => {
  const match = text?.trim().match(REGEX);
  if (!match) return null;

  const [, month, day, year] = match;
  const monthIndex = MONTHS.indexOf(month.toLowerCase());
  if (monthIndex === -1) return null;

  return new Date(Date.UTC(Number(year), monthIndex, Number(day)));
};
