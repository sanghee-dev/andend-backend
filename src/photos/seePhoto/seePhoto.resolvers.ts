import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhoto: async (_, { id }, { client }) => {
      try {
        const photo = await client.photo.findUnique({
          where: { id },
        });
        if (!photo) return { ok: false, error: "Cannot find photo:(" };

        return { ok: true, photo };
      } catch {
        return { ok: false, error: "Cannot see photo:(" };
      }
    },
  },
};

export default resolvers;
