import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import client from "./client";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const loggedInUser = await getUser(req.headers.token);
    return { loggedInUser, client };
  },
});

const PORT = process.env.PORT;

const app = express();
app.use(logger("tiny"));
server.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT}/graphql`);
});