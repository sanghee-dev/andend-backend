import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolverFn = async (_, { username }, { loggedInUser, client }) => {
  try {
    const ok = await client.user.findUnique({
      where: { username },
    });
    if (!ok) return { ok: false, error: "Cannot find user." };

    const updatedUser = await client.user.update({
      where: { id: loggedInUser.id },
      data: { following: { disconnect: { username } } },
    });
    if (!updatedUser) return { ok: false, error: "Cannot update user." };

    return { ok: true };
  } catch {
    return { ok: false, error: "Cannot unfollow user:(" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectResolver(resolverFn),
  },
};

export default resolvers;
