import { gql } from 'apollo-server-core';

export default gql`
  type Post {
    id: Int!
    caption: String!
    dealt: Boolean!
    user: User!
    photos: [Upload!]
    zone: Zone
    category: Category
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isInterest: Boolean!
    interestsCount: Int!
  }

  type Category {
    id: Int!
    name: String!
    countPost: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
