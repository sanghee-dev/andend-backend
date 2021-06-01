import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolverFn = async (_, { username }, { client }) => {
  try {
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
