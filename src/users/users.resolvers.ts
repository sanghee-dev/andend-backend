import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    totalFollowers: async ({ id }, _, { client }) =>
      await client.user.count({ where: { following: { some: { id } } } }),
    totalFollowing: async ({ id }, _, { client }) =>
      await client.user.count({ where: { followers: { some: { id } } } }),
    isFollowing: async ({ id }, _, { loggedInUser, client }) => {
      const exists = await client.user.count({
        where: { id: loggedInUser.id, following: { some: { id } } },
      });
      return Boolean(exists);
    },

    isMe: async ({ id }, _, { loggedInUser }) => id === loggedInUser?.id,
  },
};

export default resolvers;
