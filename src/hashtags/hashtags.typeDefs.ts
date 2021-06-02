import { gql } from "apollo-server-core";

export default gql`
  type Hashtag {
    id: Int!
    createAt: String!
    updateAt: String!
    hashtag: String!
    photos: [Photo]
  }
`;
