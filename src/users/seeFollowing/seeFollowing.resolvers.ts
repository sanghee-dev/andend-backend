import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (_, { username, page }, { client }) => {
      try {
        const ok = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!ok) return { ok: false, error: "That user does not exist." };

        const following = await client.user
          .findUnique({ where: { username } })
          .followers({ skip: (page - 1) * 5, take: 5 });
        const totalFollowing = await client.user.count({
          where: { followers: { some: { username } } },
        });

        return {
          ok: true,
          following,
          totalPages: Math.ceil(totalFollowing / 5),
        };
      } catch {
        return { ok: false, error: "Cannot see following:(" };
      }
    },
  },
};

export default resolvers;
