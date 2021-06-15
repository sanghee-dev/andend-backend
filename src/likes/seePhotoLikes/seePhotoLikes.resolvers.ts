import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: async (_, { id, page }, { client }) => {
      try {
        const likes = await client.like.findMany({
          where: { photoId: id },
          select: { user: { select: { username: true } } },
          skip: (page - 1) * 5,
          take: 5,
        });
        if (!likes) return { ok: false, error: "Like not found." };

        return { ok: true, users: likes.map((like) => like.user) };
      } catch {
        return { ok: false, error: "Cannot see likes:(" };
      }
    },
  },
};

export default resolvers;
