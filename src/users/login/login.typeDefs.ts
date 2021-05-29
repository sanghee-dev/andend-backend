import { gql } from "apollo-server";

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Query {
    login(username: String!, password: String!): LoginResult!
  }
`;
