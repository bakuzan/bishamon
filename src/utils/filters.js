import { ItemStatus } from 'constants/status';

export const filterListForOnHoldItems = (items = []) =>
  items.filter((x) => x.status === ItemStatus.OnHold);

export const filterListForBoardItems = (items = []) =>
  items.filter(
    (x) => ![ItemStatus.OnHold, ItemStatus.Removed].includes(x.status)
  );

export const filterProjects = (filters, items = []) => {
  const { search, types, technologies } = filters;
  const searchLower = search.toLowerCase();

  return items.filter(
    (x) =>
      x.name.toLowerCase().includes(searchLower) &&
      types.has(x.type) &&
      (!technologies.size || x.technologies.some((y) => technologies.has(y.id)))
  );
};
