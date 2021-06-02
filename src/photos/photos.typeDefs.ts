import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: Int!
    createAt: String!
    updateAt: String!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
  }
`;
