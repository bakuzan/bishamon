import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RoutePaths from 'constants/routes';
import HeaderBar from 'components/HeaderBar/HeaderBar';
import Projects from 'views/Projects/Projects';
import ProjectsCreate from 'views/Projects/ProjectsCreate';
import ProjectBoard from 'views/ProjectBoard/ProjectBoard';
import WorkItemDetail from 'views/WorkItemDetail/WorkItemDetail';

class App extends React.Component {
  render() {
    const { match } = this.props;
    const projectListUrl = `${match.path}${RoutePaths.projectList}`;
    const projectBoardUrl = `${projectListUrl}/:projectId`;

    return (
      <div className="app app--theme_default">
        <HeaderBar />
        <main>
          <Switch>
            <Redirect exact from={RoutePaths.base} to={projectListUrl} />
            <Route exact path={projectListUrl} component={Projects} />
            <Route
              path={`${projectListUrl}/create`}
              component={ProjectsCreate}
            />

            <Route
              path={`${projectBoardUrl}${
                RoutePaths.workItemDetail
              }/:workItemId`}
              component={WorkItemDetail}
            />
            <Route path={projectBoardUrl} component={ProjectBoard} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
