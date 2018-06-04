function formatDateISO(date) {
  const d = new Date(date);
  return d.toISOString();
}

function checkMapForKeys(m, keys) {
  return keys.some(x => m.has(x));
}

function firstAvailableKey(m, keys) {
  let matchingKey;
  for (let k in keys) {
    if (m.has(k) && !matchingKey) {
      matchingKey = k;
    }
  }
  return matchingKey;
}

module.exports = {
  formatDateISO,
  checkMapForKeys,
  firstAvailableKey
};
