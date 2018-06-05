import { ItemStatus, DoneStatuses } from 'constants/status';
import { createMapFromArray } from './common';

export function enumDefault(arr) {
  return arr[0];
}

export function calculateWorkItemTaskRatio(tasks) {
  const total = tasks.length;
  if (!total) return 'N/A';

  const done = tasks.filter(x => DoneStatuses.includes(x.status)).length;
  console.log(done, total);
  return `${done}/${total}`;
}

export function resolveWorkItemStatusFromTasks(workItem, tasks) {
  const tMap = createMapFromArray(tasks, 'status');
  const { status } = workItem;
  if (status === ItemStatus.Todo && tMap.has(ItemStatus.InProgress))
    return ItemStatus.InProgress;

  const onlyDoneStatuses = checkMapForKeys(tMap, []);
  if (onlyDoneStatuses) return getFirstAvailableKeyInMap(tMap, []);
  return status;
}
