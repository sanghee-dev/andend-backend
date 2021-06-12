import { gql } from "apollo-server-core";

export default gql`
  type SeeFeedResult {
    ok: Boolean!
    error: String
    photos: [Photo]
  }
  type Query {
    seeFeed(page: Int!): SeeFeedResult!
  }
`;
