import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";
import { createWriteStream } from "fs";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser, client }
) => {
  try {
    let avatarUrl = null;
    if (avatar) {
      const { filename, createReadStream } = await avatar;
      const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
      const readStream = createReadStream();
      const whiteStream = createWriteStream(
        process.cwd() + "/uploads/" + newFilename
      );
      readStream.pipe(whiteStream);
      avatarUrl = `http://localhost:5000/static/${newFilename}`;
      if (!avatarUrl) return { ok: false, error: "Cannot create url." };
    }

    let uglyPassword = null;
    if (newPassword) {
      uglyPassword = await bcrypt.hash(newPassword, 10);
      if (!uglyPassword) return { ok: false, error: "Cannot hash password." };
    }

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
