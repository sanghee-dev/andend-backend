import client from "../../client";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword, token }
    ) => {
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);
      let uglyPassword = null;
      if (newPassword) uglyPassword = await bcrypt.hash(newPassword, 10);
      const updateUser = await client.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });
      if (updateUser) {
        return { ok: true };
      } else {
        return { ok: false, error: "Cannot update profile." };
      }
    },
  },
};
