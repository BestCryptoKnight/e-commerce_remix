let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
  },

  {
    id: createEventId(),
    title: "Timed event",
    start: "2022-12-21" + "T09:30:00",
    end: "2022-12-21" + "T10:30:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
