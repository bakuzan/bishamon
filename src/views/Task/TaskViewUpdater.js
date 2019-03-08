import Fetch from 'queries/fetch';
import { ItemStatus } from 'constants/status';

export default function taskUpdater(cache, { data: { taskUpdate } }) {
  const { workItemId, status } = taskUpdate;
  const isOnHold = status === ItemStatus.OnHold;
  const isActive = ![ItemStatus.OnHold, ItemStatus.Removed].includes(status);

  if (isOnHold) {
    // Update onhold board query
    const onHoldBoard = cache.readQuerySafeBIS({
      query: Fetch.workItemTasksOnHold,
      variables: { workItemId }
    });

    if (onHoldBoard) {
      cache.writeQuery({
        query: Fetch.workItemTasksOnHold,
        variables: { workItemId },
        data: {
          ...onHoldBoard,
          tasksOnHold: [...onHoldBoard.tasksOnHold, taskUpdate]
        }
      });
    }
  }

  // Update active board query
  const activeBoard = cache.readQuery({
    query: Fetch.workItemTasks,
    variables: { workItemId }
  });
  const { tasks } = activeBoard;
  const index = tasks.findIndex((x) => x.id === taskUpdate.id);
  const oldTask = tasks[index];

  cache.writeQuery({
    query: Fetch.workItemTasks,
    variables: { workItemId },
    data: {
      ...activeBoard,
      tasksOnHoldCount: isOnHold
        ? activeBoard.tasksOnHoldCount + 1
        : activeBoard.tasksOnHoldCount,
      tasks: isActive
        ? [
            ...tasks.slice(0, index),
            { ...oldTask, ...taskUpdate },
            ...tasks.slice(index + 1)
          ]
        : tasks.filter((x) => x.id !== taskUpdate.id)
    }
  });
}
