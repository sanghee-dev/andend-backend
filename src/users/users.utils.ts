import client from "../client";
import * as jwt from "jsonwebtoken";

export const getUser = async (token) => {
  try {
    if (!token) return null;
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) return user;
    return null;
  } catch {
    return null;
  }
};
