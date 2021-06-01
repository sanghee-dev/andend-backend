import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      try {
        const user = await client.user.findFirst({ where: { username } });
        if (!user) return { ok: false, error: "User not found." };

        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) return { ok: false, error: "Incorrect password." };

        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: "365 days",
        });
        if (!token) return { ok: false, error: "Cannot create token." };

        return { ok: true, token };
      } catch {
        return { ok: false, error: "Cannot log in:(" };
      }
    },
  },
};

export default resolvers;
