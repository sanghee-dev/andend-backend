import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";
import { uploadToAWS } from "../../shared/shared.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser, client }
) => {
  try {
    let avatarUrl = null;
    if (avatar)
      avatarUrl = await uploadToAWS(avatar, loggedInUser.id, "avatar");

    let uglyPassword = null;
    if (newPassword) uglyPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        firstName,
        lastName,
        username,
        email,
        ...(uglyPassword && { password: uglyPassword }),
        bio,
        ...(avatarUrl && { avatar: avatarUrl }),
      },
    });
    if (!updatedUser) return { ok: false, error: "Cannot update user." };

    return { ok: true };
  } catch {
    return { ok: false, error: "Cannot update profile:(" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectResolver(resolverFn),
  },
};

export default resolvers;
