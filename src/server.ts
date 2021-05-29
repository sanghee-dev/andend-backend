require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return { loggedInUser: getUser(req.headers.token) };
  },
});

const PORT = process.env.PORT;

server.listen(PORT).then(() => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
});
