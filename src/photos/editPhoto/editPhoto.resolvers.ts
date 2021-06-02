import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolverFn = async (_, { id, caption }, { loggedInUser, client }) => {
  try {
    const oldPhoto = await client.photo.findFirst({
      where: { id, userId: loggedInUser.id },
      include: { hashtags: { select: { hashtag: true } } },
    });
    if (!oldPhoto) return { ok: false, error: "Photo not found." };

    const newPhoto = await client.photo.update({
      where: { id },
      data: {
        caption,
        hashtags: {
          disconnect: oldPhoto.hashtags,
          connectOrCreate: processHashtags(caption),
        },
      },
    });
    if (!newPhoto) return { ok: false, error: "Cannot update photo." };

    return { ok: true };
  } catch {
    return { ok: false, error: "Cannot edit photo:(" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectResolver(resolverFn),
  },
};

export default resolvers;
