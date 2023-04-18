import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    id: Int
    name: String
    city: String
  }
  type Article {
    id: Int
    article_name: String!
  }

  type Query {
    users: [User]
    user(id:ID): User
    articles: [Article]
  }

`;