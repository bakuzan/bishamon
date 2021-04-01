import Fetch from 'queries/fetch';
import { ItemStatus } from 'constants/status';

export default function workItemUpdater(cache, { data: { workItemUpdate } }) {
  const { projectId, status } = workItemUpdate;
  const isOnHold = status === ItemStatus.OnHold;
  const isActive = ![ItemStatus.OnHold, ItemStatus.Removed].includes(status);

  if (isOnHold) {
    // Update onhold board query
    const onHoldBoard = cache.readQuerySafeBIS({
      query: Fetch.projectWorkItemsOnHold,
      variables: { projectId }
    });

    if (onHoldBoard) {
      cache.writeQuery({
        query: Fetch.projectWorkItemsOnHold,
        variables: { projectId },
        data: {
          ...onHoldBoard,
          workItemsOnHold: [...onHoldBoard.workItemsOnHold, workItemUpdate]
        }
      });
    }
  }

  // Update active board query
  const activeBoard = cache.readQuerySafeBIS({
    query: Fetch.projectWorkItems,
    variables: { projectId }
  });

  if (activeBoard !== null) {
    const { workItems } = activeBoard;
    const index = workItems.findIndex((x) => x.id === workItemUpdate.id);
    const oldWorkItem = workItems[index];

    cache.writeQuery({
      query: Fetch.projectWorkItems,
      variables: { projectId },
      data: {
        ...activeBoard,
        workItemsOnHoldCount: isOnHold
          ? activeBoard.workItemsOnHoldCount + 1
          : activeBoard.workItemsOnHoldCount,
        workItems: isActive
          ? [
              ...workItems.slice(0, index),
              { ...oldWorkItem, ...workItemUpdate },
              ...workItems.slice(index + 1)
            ]
          : workItems.filter((x) => x.id !== workItemUpdate.id)
      }
    });
  }
}
