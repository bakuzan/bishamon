import React, { useState, useEffect } from 'react';
import { Query } from 'react-apollo';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import ProjectInformation from 'components/ProjectInformation/ProjectInformation';
import { ButtonisedNavButton, ButtonisedNavLink } from 'components/Buttons';

import Fetch from 'queries/fetch';
import {
  taskBoardUrl,
  taskCreateUrl,
  taskEditUrl,
  workItemBoardUrl,
  buildUrlWithIds
} from 'constants/routes';
import { loadableSettings } from 'utils/common';

const TaskBoard = Loadable({
  loader: () => import(/* webpackChunkName: 'TaskBoard' */ './TaskBoard'),
  ...loadableSettings
});
const TaskBoardCreate = Loadable({
  loader: () => import(/* webpackChunkName: 'TaskCreate' */ './TaskCreate'),
  ...loadableSettings
});
const TaskView = Loadable({
  loader: () => import(/* webpackChunkName: 'TaskView' */ './TaskView'),
  ...loadableSettings
});

function TaskHub({ match, location }) {
  const [shouldRender, setRenderState] = useState(false);
  const projectId = Number(match.params.projectId);
  const workItemId = Number(match.params.workItemId);
  const createUrl = buildUrlWithIds(taskCreateUrl, {
    projectId,
    workItemId
  });
  const backUrl = buildUrlWithIds(workItemBoardUrl, {
    projectId,
    workItemId
  });

  const { pathname } = location;
  useEffect(() => {
    setRenderState(pathname.endsWith('tasks'));
  }, [pathname]);

  return (
    <Query
      query={Fetch.projectWorkItemInformation}
      variables={{ projectId, workItemId }}
    >
      {({ loading, error, data = {} }) => {
        const projectData = data.project;
        const projectName = (projectData && projectData.name) || '';
        const workItemName =
          (projectData && projectData.workItem && projectData.workItem.name) ||
          '';

        return (
          <ProjectInformation
            data={projectData}
            headerActions={
              shouldRender && (
                <React.Fragment>
                  <p id="addTaskDescription" className="for-screenreader-only">
                    Add new task item to the "{workItemName}" work item in the{' '}
                    {projectName} project
                  </p>
                  <ButtonisedNavButton
                    btnStyle="primary"
                    to={createUrl}
                    onMouseOver={() => TaskBoardCreate.preload()}
                    aria-describedby="addTaskDescription"
                  >
                    Add Task
                  </ButtonisedNavButton>
                  <p
                    id="goToWorkItemDescription"
                    className="for-screenreader-only"
                  >
                    Go to the {projectName} project board
                  </p>
                  <ButtonisedNavLink
                    to={backUrl}
                    aria-describedby="goToWorkItemDescription"
                  >
                    To Work Items
                  </ButtonisedNavLink>
                </React.Fragment>
              )
            }
          >
            <Switch>
              <Route
                exact
                path={taskBoardUrl}
                render={(props) => (
                  <TaskBoard {...props} projectData={projectData} />
                )}
              />
              <Route
                path={taskCreateUrl}
                render={(props) => (
                  <TaskBoardCreate {...props} projectData={projectData} />
                )}
              />
              <Route
                path={taskEditUrl}
                render={(props) => (
                  <TaskView {...props} projectData={projectData} />
                )}
              />
            </Switch>
          </ProjectInformation>
        );
      }}
    </Query>
  );
}

export default TaskHub;
