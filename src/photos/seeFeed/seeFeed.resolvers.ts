import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (_, { offset }, { loggedInUser, client }) => {
  try {
    const photos = await client.photo.findMany({
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
