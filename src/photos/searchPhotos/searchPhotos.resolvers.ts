import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPhotos: async (_, { keyword, page }, { client }) => {
      try {
        const photos = await client.photo.findMany({
          where: { caption: { contains: keyword } },
          skip: (page - 1) * 5,
          take: 5,
        });
        if (!photos) return { ok: false, error: "Photos not found." };

        return { ok: true, photos };
      } catch {
        return { ok: false, error: "Cannot search photos:(" };
      }
    },
  },
};

export default resolvers;
