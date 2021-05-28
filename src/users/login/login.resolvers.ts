import client from "../../client";
const bcrypt = require("bcrypt");

export default {
  Query: {
    login: async (_, { username, password }) => {
      try {
        const user = await client.user.findFirst({
          where: {
            username,
          },
        });
        if (!user) return { ok: false, error: "User not found." };

        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk)
          return {
            ok: false,
            error: "Incorrect password.",
          };

        return {
          ok: true,
        };
      } catch (e) {
        return e;
      }
    },
  },
};
