import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolverFn = async (_, { file, caption }, { loggedInUser, client }) => {
  try {
    const photo = await client.photo.create({
      data: {
        user: { connect: { id: loggedInUser.id } },
        file,
        caption,
        hashtags: {
          connectOrCreate: processHashtags(caption),
        },
      },
    });
    if (!photo) return { ok: false, error: "Cannot create photo." };

    return { ok: true, photo: file };
  } catch {
    return { ok: false, error: "Cannot upload photo:(" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(resolverFn),
  },
};

export default resolvers;
