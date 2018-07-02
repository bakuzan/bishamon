const setTimeForDate = (h, m, s) => (date) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m, s);
};
const startOfDay = setTimeForDate(0, 0, 0);

function formatDateISO(date) {
  const d = new Date(date);
  return d.toISOString();
}

function getDateXDaysFromToday(offset) {
  const d = startOfDay(new Date());
  d.setDate(d.getDate() + offset);
  return new Date(d);
}

function checkMapForKeys(m, keys) {
  return keys.some((x) => m.has(x));
}

function firstAvailableKey(m, keys) {
  return keys.map((key) => (m.has(key) ? key : undefined)).find((x) => !!x);
}

const mapObjectListToIdList = (arr) => arr.map((o) => o.id);

module.exports = {
  formatDateISO,
  getDateXDaysFromToday,
  setTimeForDate,
  startOfDay,
  checkMapForKeys,
  firstAvailableKey,
  mapObjectListToIdList
};
