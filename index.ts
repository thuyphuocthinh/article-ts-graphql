import express, { Express } from "express";
import * as database from "./config/database.config";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolver";
import { requireAuth } from "./middlewares/auth.middleware";
const app: Express = express();
const port: number | string = process.env.PORT || 3000;
const startServer = async () => {
  // dotenv
  dotenv.config();

  // database
  database.connect();

  // GraphQL
  app.use("/graphql", requireAuth);

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req }) => {
      return { ...req };
    },
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
