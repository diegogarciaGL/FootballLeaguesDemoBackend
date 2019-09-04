import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env' });
}

import express from 'express';
import mongoose from 'mongoose';
import { typeDefs, resolvers } from './graphql';
import https from 'https';
import http from 'http';
import fs from 'fs';
import compression from 'compression';
import { ApolloEngine } from 'apollo-engine';
import { ApolloServer, gql } from 'apollo-server-express';
import { loadData } from './dataLoader';
import leaguesData from './data/data.json';

const {
  PORT,
  DATABASE_CONNECTION: db,
  APOLLO_GRAPHQL_PORT: apolloGraphqlPort,
  ENABLE_GRAPHQL_INTROSPECTION: enableInstrospection,
  ENABLE_GRAPHQL_PLAYGROUND: enablePlayground,
  ENGINE_API_KEY: apolloEngineApiKey
} = process.env;

if (!db) throw new Error('No database connection provided');

const environment = process.env.NODE_ENV || 'dev';
const isProduction = environment === 'production';
const port = PORT || '4000';

const databaseConnectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true
};

// Create server app
const app = express();

const apolloServer = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  tracing: true,
  cacheControl: false,
  introspection: !isProduction || enableInstrospection === 'true',
  playground: !isProduction || enablePlayground === 'true',
  // We set `engine` to false, so that the new agent is not used.
  engine: false,
  // add request and response to graphQL context
  context: async ({ req, res }): Promise<object> => {
    // This is the place where you could be injecting data into the context object
    // to then use it on GraphQL context like on the resolvers for instance.

    // A common use case is to try to pull a bearer access token from the request headers
    // then, with the token, try to figure out what's the user behind the current request
    // and then injecting that user to the conxtex (by returning something like this:

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    //  const token = req.headers.authorization || '';
    //  if(token) {
    //    const conditions = { jwt: token.split(' ')[1], status: AccessTokenActive };
    //    const accessToken = await AccessTokenModel.findOne(conditions);
    //    if(accessToken) {
    //      const user = await UserModel.findById(accessToken.userId);
    //      if(user) {
    //        return { req, res, currentUser: user };
    //      }
    //    }
    //  }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return { req, res };
  }
});

apolloServer.applyMiddleware({ app });

const engine = new ApolloEngine({
  apiKey: apolloEngineApiKey
});

engine.listen({
  port: apolloGraphqlPort,
  graphqlPaths: ['/graphql'],
  expressApp: app,
  launcherOptions: {
    startupTimeout: 3000
  }
}, () => {
  console.log('Apollo engine listening');
});

app.get('/environment', (req, resp) => {
  resp.send(`Environment: ${environment}`)
});

app.get('/loadData', async (req, resp) => {
  const data = await loadData(leaguesData);
  resp.send(data);
});

//Add compression
app.use(compression());

let webServer;
if (!isProduction) {
  webServer = https.createServer({
    key: fs.readFileSync('./ssl/certs/device.key'),
    cert: fs.readFileSync('./ssl/certs/localhost.crt')
  }, app);
}
else {
  //Production by itself use SSL implemented at infraestructure level by service provider
  webServer = http.createServer(app);
}

//Start the express app
webServer.listen(port, async () => {
  console.log(`Web server running on port ${port}`);
  // Connect to MongoDB with Mongoose.
  try {
    await mongoose.connect(db, databaseConnectionOptions);
    console.log('MongoDB database connected');
  }
  catch (err) {
    console.log(err);
  }
});

// when shutdown signal is received, do graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.disconnect();
    console.log('Database connection closed');

    process.exit();
  }
  catch (ex) {
    console.log('Error closing database connection', ex);
  }
});