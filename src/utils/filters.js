import { OnHold, Removed } from 'constants/status';

export const filterListForOnHoldItems = (items = []) =>
  items.filter((x) => x.status === OnHold);

export const filterListForBoardItems = (items = []) =>
  items.filter((x) => ![OnHold, Removed].includes(x.status));

export const filterProjects = (filters, items = []) => {
  const { search, types, technologies } = filters;
  const searchLower = search.toLowerCase();
  // TODO
  // technology needs to be inclusive, not exclusive
  return items.filter(
    (x) =>
      x.name.toLowerCase().includes(searchLower) &&
      types.has(x.type) &&
      x.technologies.every((y) => !technologies.has(y.id))
  );
};
