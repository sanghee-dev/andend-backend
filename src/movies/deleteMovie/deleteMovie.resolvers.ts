import client from "../../client";

export const resolvers = {
  Mutation: {
    deleteMovie: (_, { id }) =>
      client.movie.delete({
        where: { id },
      }),
  },
};
