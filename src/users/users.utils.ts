import client from "../client";
import * as jwt from "jsonwebtoken";

export const getUser = async (token: string) => {
  try {
    if (!token) return null;
    const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({
        where: { id: verifiedToken["id"] },
      });
      if (user) return user;
    }
    return null;
  } catch {
    return null;
  }
};

export const protectResolver = (ourResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    const isQuery = info.operation.operation === "query";
    return isQuery
      ? null
      : { ok: false, error: "Please log in to perform this action." };
  }
  return ourResolver(root, args, context, info);
};
