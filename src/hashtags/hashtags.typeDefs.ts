import { gql } from "apollo-server-core";

export default gql`
  type Hashtag {
    id: Int!
    createdAt: String!
    updatedAt: String!
    hashtag: String!
    photos(page: Int!): [Photo]
    photoNumber: Int!
  }
`;
