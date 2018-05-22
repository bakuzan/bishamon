import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import RoutePaths from 'constants/routes';

class App extends React.Component {
  render() {
    const {match} = this.props;
    const projectListUrl = `${match.path}${RoutePaths.projectList}`;

    return (
      <div className="app">
        <Switch>
          <Redirect exact from={RoutePaths.base} to={projectListUrl} />
          <Route exact path={projectListUrl} render={() => <div>project list placeholder</div>} />
          <Route path={`${projectListUrl}/:projectId`} render={() => <div>project create placeholder</div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
