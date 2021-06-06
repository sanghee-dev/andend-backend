import { gql } from "apollo-server-core";

export default gql`
  type Like {
    id: Int!
    createAt: String!
    updatedAt: String!
    user: User!
    photo: Photo!
  }
`;
