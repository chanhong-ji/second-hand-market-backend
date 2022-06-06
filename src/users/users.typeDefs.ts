import { gql } from 'apollo-server-core';

export default gql`
  type User {
    id: Int!
    name: String!
    phone: Int!
    avatar: String
    followingCount: Int!
    postsCount: Int!
    zone: Zone
    posts(offset: Int): [Post]
    createdAt: String!
    updatedAt: String!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
