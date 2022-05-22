import { gql } from 'apollo-server-core';

export default gql`
  type User {
    id: Int!
    name: String!
    phone: Int!
    avatar: String
    following: [User]
    # posts: [Post]
    # zones: [Zone]
    # interests: [Post]
    createdAt: String!
    updatedAt: String!
  }
`;
