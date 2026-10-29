const EVENTS = [{ pool: "Samhain", start: [10, 12], end: [11, 1] }];

const within = (date, [startMonth, startDay], [endMonth, endDay]) => {
  const value = (date.getMonth() + 1) * 100 + date.getDate();
  const start = startMonth * 100 + startDay;
  const end = endMonth * 100 + endDay;
  return start <= end ? value >= start && value <= end : value >= start || value <= end;
};

export const active = (date = new Date()) => EVENTS.find((event) => within(date, event.start, event.end));
