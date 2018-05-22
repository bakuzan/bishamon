import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import App from './App';
import RoutePaths from 'constants/routes';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API
});

ReactDOM.render(
  <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to={RoutePaths.base} />
          <Route path={RoutePaths.base} component={App} />
        </Switch>
      </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
