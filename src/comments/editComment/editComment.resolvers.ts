import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (_, { id, payload }, { loggedInUser, client }) => {
  try {
    const comment = await client.comment.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!comment) return { ok: false, error: "Comment not found." };
    if (comment.userId !== loggedInUser.id)
      return { ok: false, error: "Not authorized." };

    const newComment = await client.comment.update({
      where: { id },
      data: { payload },
    });
    if (!newComment) return { ok: false, error: "Cannot edit comment." };

    return { ok: true };
  } catch {
    return { ok: false, error: "Cannot edit comment:(" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editComment: protectResolver(resolverFn),
  },
};

export default resolvers;
