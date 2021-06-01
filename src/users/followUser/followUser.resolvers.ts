import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolverFn = async (_, { username }, { loggedInUser, client }) => {
  try {
    const user = await client.user.update({
      where: { id: loggedInUser.id },
      data: { following: { connect: { username } } },
    });
    if (!user) return { ok: false, error: "Cannot follow user." };

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
