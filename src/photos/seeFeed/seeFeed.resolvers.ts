import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (_, { offset }, { loggedInUser, client }) => {
  try {
    return client.photo.findMany({
      where: {
        OR: [
          { user: { followers: { some: { id: loggedInUser.id } } } },
          { userId: loggedInUser.id },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 2,
      skip: offset,
    });
  } catch {
    return [];
  }
};

const resolvers: Resolvers = {
  Query: {
    seeFeed: protectResolver(resolverFn),
  },
};

export default resolvers;
