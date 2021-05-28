import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    seeMovie(id: Int!): Movie
  }
`;
