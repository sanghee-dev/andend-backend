import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (_, { id }, { loggedInUser, client }) => {
  try {
    const comment = await client.comment.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!comment) return { ok: false, error: "Comment not found." };
    if (comment.userId !== loggedInUser.id)
      return { ok: false, error: "Not authorized." };

    const deleteComment = await client.comment.delete({ where: { id } });

    return { ok: true };
  } catch {
    return { ok: false, error: "Cannot :(" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectResolver(resolverFn),
  },
};

export default resolvers;
