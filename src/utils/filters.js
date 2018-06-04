import { OnHold } from 'constants/status';

export const filterListForOnHoldItems = (items = []) =>
  items.filter(x => x.status === OnHold);
