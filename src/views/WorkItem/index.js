import React, { useEffect, useState } from 'react';
import { Query } from 'react-apollo';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import ProjectInformation from 'components/ProjectInformation/ProjectInformation';
import { ButtonisedNavButton, ButtonisedNavLink } from 'components/Buttons';

import Fetch from 'queries/fetch';
import {
  buildUrlWithIds,
  projectListUrl,
  workItemBoardUrl,
  workItemCreateUrl,
  workItemEditUrl
} from 'constants/routes';
import { loadableSettings } from 'utils/common';

const WorkItemBoard = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'WorkItemBoard' */ './WorkItemBoard'),
  ...loadableSettings
});
const WorkItemBoardCreate = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'WorkItemCreate' */ './WorkItemCreate'),
  ...loadableSettings
});
const WorkItemView = Loadable({
  loader: () => import(/* webpackChunkName: 'WorkItemView' */ './WorkItemView'),
  ...loadableSettings
});

function WorkItemHub({ match, location }) {
  const [shouldRender, setRenderState] = useState(false);
  const projectId = Number(match.params.projectId);
  const backUrl = projectListUrl;
  const createUrl = buildUrlWithIds(workItemCreateUrl, {
    projectId
  });

  const { pathname } = location;
  useEffect(() => {
    setRenderState(pathname.endsWith('work-items'));
  }, [pathname]);

  return (
    <Query query={Fetch.projectInformation} variables={{ id: projectId }}>
      {({ loading, error, data = {} }) => {
        const projectData = data.project;
        return (
          <ProjectInformation
            data={projectData}
            headerActions={
              shouldRender && (
                <React.Fragment>
                  <ButtonisedNavButton
                    btnStyle="primary"
                    to={createUrl}
                    onMouseOver={() => WorkItemBoardCreate.preload()}
                  >
                    Add Work
                  </ButtonisedNavButton>
                  <ButtonisedNavLink to={backUrl}>
                    To Projects
                  </ButtonisedNavLink>
                </React.Fragment>
              )
            }
          >
            <Switch>
              <Route
                exact
                path={workItemBoardUrl}
                render={(props) => (
                  <WorkItemBoard {...props} projectData={projectData} />
                )}
              />
              <Route
                path={workItemCreateUrl}
                render={(props) => (
                  <WorkItemBoardCreate {...props} projectData={projectData} />
                )}
              />
              <Route
                path={workItemEditUrl}
                render={(props) => (
                  <WorkItemView {...props} projectData={projectData} />
                )}
              />
            </Switch>
          </ProjectInformation>
        );
      }}
    </Query>
  );
}

export default WorkItemHub;
