import { OnHold } from 'constants/status';

export const filterListForOnHoldTasks = (items = []) =>
  items.filter(x => x.status === OnHold);
