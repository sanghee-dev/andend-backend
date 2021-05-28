import { gql } from "apollo-server";

export default gql`
  type loginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Query {
    login(username: String!, password: String!): loginResult!
  }
`;
