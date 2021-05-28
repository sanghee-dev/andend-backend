import { gql } from "apollo-server";

export const typeDefs = gql`
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
  }
`;
