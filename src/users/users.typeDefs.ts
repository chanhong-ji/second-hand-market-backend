import { gql } from 'apollo-server-core';

export default gql`
  type User {
    id: Int!
    name: String!
    phone: Int!
    avatar: String
    following: [User]!
    followerCount: Int!
    followingCount: Int!
    postsCount: Int!
    dealtCount: Int!
    zone: Zone!
    zoneId: String!
    zoneFirst: Int
    zoneSecond: Int
    posts(offset: Int): [Post]
    createdAt: String!
    updatedAt: String!
    isMe: Boolean!
    isFollowing: Boolean!
    interestCount: Int!
  }
`;
