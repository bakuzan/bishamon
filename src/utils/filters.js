import { OnHold, Removed } from 'constants/status';

export const filterListForOnHoldItems = (items = []) =>
  items.filter(x => x.status === OnHold);

export const filterListForBoardItems = (items = []) =>
  items.filter(x => ![OnHold, Removed].includes(x.status));
