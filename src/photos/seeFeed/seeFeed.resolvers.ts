import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (_, { page = 1 }, { loggedInUser, client }) => {
  try {
    const photos = await client.photo.findMany({
      where: {
        OR: [
          { user: { followers: { some: { id: loggedInUser.id } } } },
          { userId: loggedInUser.id },
        ],
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * 5,
      take: 5,
    });
    if (!photos) return { ok: false, error: "Photos not found." };

    return { ok: true, photos };
  } catch {
    return { ok: false, error: "Cannot see feed:(" };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeFeed: protectResolver(resolverFn),
  },
};

export default resolvers;
