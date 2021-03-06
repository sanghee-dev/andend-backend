import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolverFn = async (_, { username }, { loggedInUser, client }) => {
  try {
    const user = await client.user.findUnique({
      where: { username },
      select: { id: true },
    });
    if (!user) return { ok: false, error: "User not found." };

    const updatedUser = await client.user.update({
      where: { id: loggedInUser.id },
      data: { following: { connect: { username } } },
    });
    if (!updatedUser) return { ok: false, error: "Cannot update user." };

    return { ok: true };
  } catch {
    return { ok: false, error: "Cannot follow user:(" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectResolver(resolverFn),
  },
};

export default resolvers;
