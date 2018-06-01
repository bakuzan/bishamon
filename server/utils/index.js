function formatDateISO(date) {
  const d = new Date(date);
  return d.toISOString();
}

module.exports = {
  formatDateISO
};
