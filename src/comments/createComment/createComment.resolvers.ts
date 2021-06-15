import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (
  _,
  { photoId, payload },
  { loggedInUser, client }
) => {
  try {
    const photo = await client.photo.findUnique({
      where: { id: photoId },
      select: { id: true },
    });
    if (!photo) return { ok: false, error: "Photo not found." };

    const comment = await client.comment.create({
      data: {
        payload,
        photo: { connect: { id: photoId } },
        user: { connect: { id: loggedInUser.id } },
      },
    });
    if (!comment) return { ok: false, error: "Cannot create comment." };

    return { ok: true };
  } catch {
    return { ok: false, error: "Cannot create comment:(" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectResolver(resolverFn),
  },
};

export default resolvers;
