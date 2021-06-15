import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (_, { id }, { loggedInUser, client }) => {
  try {
    const photo = await client.photo.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!photo) return { ok: false, error: "Photo not found." };
    if (photo.userId !== loggedInUser.id)
      return { ok: false, error: "Not authorized." };

    const deletelikes = await client.like.deleteMany({
      where: { photoId: id },
    });
    const deleteComments = await client.comment.deleteMany({
      where: { photoId: id },
    });

    const deletePhoto = await client.photo.delete({ where: { id } });

    return { ok: true };
  } catch {
    return { ok: false, error: "Cannot delete photo:(" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: protectResolver(resolverFn),
  },
};

export default resolvers;
