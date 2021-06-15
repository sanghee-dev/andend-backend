import { Resolvers } from "../../types";

export const resolvers: Resolvers = {
  Query: {
    seePhotoComments: async (_, { photoId, page }, { client }) => {
      try {
        const comments = await client.comment.findMany({
          where: { photo: { id: photoId } },
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * 5,
          take: 5,
        });
        if (!comments) return { ok: false, error: "Cannot find comments." };

        return { ok: true, comments };
      } catch {
        return { ok: false, error: "Cannot see comments:(" };
      }
    },
  },
};
