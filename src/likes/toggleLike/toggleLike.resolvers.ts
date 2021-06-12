import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (_, { photoId }, { loggedInUser, client }) => {
  try {
    const photo = await client.photo.findUnique({ where: { id: photoId } });
    if (!photo) return { ok: false, error: "Photo not found." };

    const likeWhere = { userId_photoId: { userId: loggedInUser.id, photoId } };
    const like = await client.like.findUnique({ where: likeWhere });
    if (like) {
      await client.like.delete({ where: likeWhere });
    } else {
      await client.like.create({
        data: {
          user: { connect: { id: loggedInUser.id } },
          photo: { connect: { id: photo.id } },
        },
      });
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Cannot toggle like:(" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectResolver(resolverFn),
  },
};

export default resolvers;
