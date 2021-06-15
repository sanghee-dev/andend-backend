import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page }, { client }) => {
      try {
        const user = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!user) return { ok: false, error: "User not found." };

        const followers = await client.user
          .findUnique({ where: { username } })
          .followers({ skip: (page - 1) * 5, take: 5 });
        const totalFollowers = await client.user.count({
          where: { following: { some: { username } } },
        });

        return {
          ok: true,
          followers,
          totalPages: Math.ceil(totalFollowers / 5),
        };
      } catch {
        return { ok: false, error: "Cannot see followers:(" };
      }
    },
  },
};

export default resolvers;
