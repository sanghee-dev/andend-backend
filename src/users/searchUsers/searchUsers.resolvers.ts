import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, page }, { client }) => {
      try {
        const users = await client.user.findMany({
          where: { username: { contains: keyword.toLowerCase() } },
          skip: (page - 1) * 5,
          take: 5,
        });
        if (!users) return { ok: false, error: "Users not found" };

        const totalUsers = await client.user.count({
          where: { username: { contains: keyword.toLowerCase() } },
        });

        return { ok: true, users, totalPages: Math.ceil(totalUsers / 5) };
      } catch {
        return { ok: false, error: "Cannot see followers:(" };
      }
    },
  },
};

export default resolvers;
