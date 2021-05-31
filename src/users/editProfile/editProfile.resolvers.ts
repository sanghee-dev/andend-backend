import * as bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";
import { createWriteStream } from "fs";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser, client }
) => {
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const whiteStream = createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(whiteStream);
    avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }

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
  if (updatedUser) {
    return { ok: true };
  } else {
    return { ok: false, error: "Cannot update profile." };
  }
};

export default {
  Mutation: {
    editProfile: protectResolver(resolverFn),
  },
};
