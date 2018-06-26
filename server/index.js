const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const Constants = require('./constants/index');
const typeDefs = require('./type-definitions');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  }
});
const app = express();

const corsOptions = {
  origin: function(origin, callback) {
    if (Constants.whitelist.test(origin)) {
      callback(null, true);
    } else {
      console.log(`Origin: ${origin}, not allowed by CORS`);
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(
  `/${Constants.appName}/favicon.ico`,
  favicon(path.join(__dirname, '..', 'build', 'favicon.ico'))
);
app.use(
  `/${Constants.appName}/static`,
  express.static(path.resolve(__dirname, '..', 'build/static'))
);

app.use(
  '/graphql',
  cors(corsOptions),
  bodyParser.json(),
  graphqlExpress({ schema })
);
app.use('/graphiql', cors(), graphiqlExpress({ endpointURL: '/graphql' }));

// Always return the main index.html, so react-router render the route in the client
if (process.env.NODE_ENV === Constants.environment.production) {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

// Start the server
const PORT =
  process.env.NODE_ENV === Constants.environment.production
    ? process.env.PORT
    : process.env.SERVER_PORT || 9005;

app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});
