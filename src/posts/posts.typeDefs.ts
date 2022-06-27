import { gql } from 'apollo-server-core';

export default gql`
  type Post {
    id: Int!
    title: String!
    caption: String!
    price: Int!
    dealt: Boolean!
    user: User!
    userId: Int!
    zone: Zone!
    zoneId: Int!
    photos: [String!]!
    category: Category!
    rooms: [Room]!
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

  type Zone {
    id: Int!
    code: Int!
    name: String!
    countUser: Int!
    countPost: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
