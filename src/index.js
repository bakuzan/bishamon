import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';
import RoutePaths from 'constants/routes';

import 'meiko/dist/bundle.min.css';
import './styles/index.css';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API,
  cache
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
