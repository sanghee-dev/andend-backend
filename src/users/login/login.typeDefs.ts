import { gql } from "apollo-server";

export default gql`
  type LoginResult {
    ok: Boolean!
    error: String
    token: String
  }
  type Query {
    login(username: String!, password: String!): LoginResult!
  }
`;
