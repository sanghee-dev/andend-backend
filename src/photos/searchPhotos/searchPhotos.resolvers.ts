import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPhotos: async (_, { keyword, offset }, { client }) => {
      try {
        const photos = await client.photo.findMany({
          where: { caption: { contains: keyword } },
          take: 2,
          skip: offset,
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
