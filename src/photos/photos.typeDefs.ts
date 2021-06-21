import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
    likeNumber: Int!
    comments: [Comment]
    commentNumber: Int!
    isMine: Boolean!
    isLiked: Boolean!
  }
`;
