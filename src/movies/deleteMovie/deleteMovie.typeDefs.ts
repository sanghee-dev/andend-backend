import { gql } from "apollo-server";

export const typeDefs = gql`
  type Mutation {
    deleteMovie(id: Int!): Movie
  }
`;
