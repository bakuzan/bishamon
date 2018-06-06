const Routes = Object.freeze({
  base: '/bishamon',
  projectList: '/projects',
  taskBoard: '/work-item'
});
export default Routes;
export const PROJECT_LIST_URL = `${Routes.base}${Routes.projectList}`;
