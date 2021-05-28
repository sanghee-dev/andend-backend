import client from "../../client";

export const resolvers = {
  Query: {
    seeMovie: (_, { id }) =>
      client.movie.findUnique({
        where: {
          id,
        },
      }),
  },
};
