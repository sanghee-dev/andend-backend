import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (_, { file, caption }, { loggedInUser, client }) => {
  try {
    let hashtagObjArr = [];
    if (caption) {
      const hashtags = caption.match(/#[\w]+/g);
      hashtagObjArr = hashtags.map((hashtag) => ({
        where: { hashtag },
        create: { hashtag },
      }));
    }

    const photo = await client.photo.create({
      data: {
        user: { connect: { id: loggedInUser.id } },
        file,
        caption,
        hashtags: {
          connectOrCreate: hashtagObjArr,
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