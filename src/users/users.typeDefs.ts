import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String!
    createAt: String!
    updateAt: String!
  }
`;
