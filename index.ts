import express, { Express } from "express";
import * as database from "./config/database.config";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const app: Express = express();
const port: number | string = process.env.PORT || 3000;
const startServer = async () => {
  // dotenv
  dotenv.config();

  // database
  database.connect();

  // GraphQL

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

startServer();
