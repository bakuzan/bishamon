export const base = '/bishamon';

export const projectListUrl = `${base}/projects`;
export const projectCreateUrl = `${projectListUrl}/create`;
export const projectEditUrl = `${projectListUrl}/:projectId`;

export const workItemBoardUrl = `${projectEditUrl}/work-items`;
export const workItemCreateUrl = `${workItemBoardUrl}/create`;
export const workItemEditUrl = `${workItemBoardUrl}/:workItemId`;

export const taskBoardUrl = `${workItemEditUrl}/tasks`;
export const taskCreateUrl = `${taskBoardUrl}/create`;
export const taskEditUrl = `${taskBoardUrl}/:taskId`;

export function buildUrlWithIds(url, ids) {
  return Object.keys(ids).reduce((p, k) => p.replace(`:${k}`, ids[k]), url);
}
