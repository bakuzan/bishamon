const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const Constants = require("./constants/index");
const typeDefs = require("./type-definitions");
const resolvers = require("./resolvers");


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const app = express();


const corsOptions = {
  origin: function (origin, callback) {
    if (Constants.whitelist.indexOf(origin) > -1) {
      callback(null, true)
    } else {
      console.log(`Origin: ${origin}, not allowed by CORS`)
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use('/graphql', cors(corsOptions), bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', cors(), graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
const PORT = process.env.NODE_ENV === Constants.environment.production
 ? process.env.PORT
 : process.env.SERVER_PORT || 9005;

app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});
