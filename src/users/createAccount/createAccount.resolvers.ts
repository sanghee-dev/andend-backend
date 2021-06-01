import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password },
      { client }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });
        if (existingUser)
          return { ok: false, error: "This username/email is already taken." };

        const uglyPassword = await bcrypt.hash(password, 10);
        const newAccount = await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
        if (!newAccount)
          return { ok: false, error: "Cannot create new account." };

        return { ok: true };
      } catch {
        return { ok: false, error: "Cannot create account:(" };
      }
    },
  },
};

export default resolvers;
