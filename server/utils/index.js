function formatDateISO(date) {
  const d = new Date(date);
  return d.toISOString();
}

function checkMapForKeys(m, keys) {
  return keys.some(x => m.has(x));
}

function firstAvailableKey(m, keys) {
  return keys.map(key => (m.has(key) ? key : undefined)).find(x => !!x);
}

module.exports = {
  formatDateISO,
  checkMapForKeys,
  firstAvailableKey
};
