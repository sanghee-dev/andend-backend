import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    createdAt: String!
    updatedAt: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String!
    bio: String
    avatar: String
    followers: [User]
    following: [User]
    followerNumber: Int!
    followingNumber: Int!
    isFollowing: Boolean!
    isMe: Boolean!
  }
`;
