import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeHashtag: async (_, { hashtag }, { client }) => {
      try {
        const tag = await client.hashtag.findUnique({
          where: { hashtag },
        });
        if (!tag) return { ok: false, error: "Cannot find hashtag." };

        return { ok: true, hashtag: tag };
      } catch {
        return { ok: false, error: "Cannot see hashtag:(" };
      }
    },
  },
};

export default resolvers;
