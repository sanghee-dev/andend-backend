import client from "../../client";

export default {
  Mutation: {
    createAccount: (_, { firstName, lastName, username, email, password }) =>
      client.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password,
        },
      }),
  },
};
