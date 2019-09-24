import Fetch from 'queries/fetch';

export function workItemUpdater(cache, { data: { workItemUpdate } }) {
  const projectId = workItemUpdate.projectId;

  // Update onhold board query
  const onHoldBoard = cache.readQuery({
    query: Fetch.projectWorkItemsOnHold,
    variables: { projectId }
  });

  cache.writeQuery({
    query: Fetch.projectWorkItemsOnHold,
    variables: { projectId },
    data: {
      ...onHoldBoard,
      workItemsOnHold: onHoldBoard.workItemsOnHold.filter(
        (x) => x.id !== workItemUpdate.id
      )
    }
  });

  // Update active board query
  const activeBoard = cache.readQuery({
    query: Fetch.projectWorkItems,
    variables: { projectId }
  });

  cache.writeQuery({
    query: Fetch.projectWorkItems,
    variables: { projectId },
    data: {
      ...activeBoard,
      workItemsOnHoldCount: activeBoard.workItemsOnHoldCount - 1,
      workItems: [...activeBoard.workItems, workItemUpdate]
    }
  });
}

export function dashboardWorkItemUpdater(cache, { data: { workItemUpdate } }) {
  const data = cache.readQuery({
    query: Fetch.getDashboard
  });

  const dashboardItems = data.dashboard.dashboardCurrentWork;

  cache.writeQuery({
    query: Fetch.getDashboard,
    data: {
      ...data,
      dashboardCurrentWork: dashboardItems.map((x) =>
        x.id !== workItemUpdate.id ? x : workItemUpdate
      )
    }
  });
}

export function taskUpdater(cache, { data: { taskUpdate } }) {
  const workItemId = taskUpdate.workItemId;

  // Update onhold board query
  const onHoldBoard = cache.readQuery({
    query: Fetch.workItemTasksOnHold,
    variables: { workItemId }
  });

  cache.writeQuery({
    query: Fetch.workItemTasksOnHold,
    variables: { workItemId },
    data: {
      ...onHoldBoard,
      tasksOnHold: onHoldBoard.tasksOnHold.filter((x) => x.id !== taskUpdate.id)
    }
  });

  // Update active board query
  const activeBoard = cache.readQuery({
    query: Fetch.workItemTasks,
    variables: { workItemId }
  });

  cache.writeQuery({
    query: Fetch.workItemTasks,
    variables: { workItemId },
    data: {
      ...activeBoard,
      tasksOnHoldCount: activeBoard.tasksOnHoldCount - 1,
      tasks: [...activeBoard.tasks, taskUpdate]
    }
  });
}
