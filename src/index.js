import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import RoutePaths from 'constants/routes';

import 'meiko/dist/bundle.min.css';
import './styles/index.scss';

const client = new ApolloClient({
  cache: new InMemoryCache({
    cacheRedirects: {
      Query: {
        workItem: (_, args, { getCacheKey }) =>
          getCacheKey({ __typename: 'WorkItem', id: args.id })
      }
    }
  }),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_API,
      credentials: 'same-origin'
    })
  ])
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
