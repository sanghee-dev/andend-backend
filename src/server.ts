require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import client from "./client";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const loggedInUser = await getUser(req.headers.token);
    return { loggedInUser, client };
  },
});

const PORT = process.env.PORT;

server.listen(PORT).then(() => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
});
