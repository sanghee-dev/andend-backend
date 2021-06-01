import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { username }, { client }) => {
      try {
        const user = await client.user.findUnique({
          where: { username },
          include: { followers: true, following: true },
        });
        if (!user) return { ok: false, error: "Cannot find user." };

        return { ok: true, user };
      } catch {
        return { ok: false, error: "Cannot see profile:(" };
      }
    },
  },
};

export default resolvers;
