import { gql } from "apollo-server";

export const typeDefs = gql`
  type Movie {
    id: Int
    title: String
    year: Int
    genre: String
    createdAt: String
    updatedAt: String
  }
`;
