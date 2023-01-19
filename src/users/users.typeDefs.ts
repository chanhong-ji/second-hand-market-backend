import { gql } from 'apollo-server-core';

export default gql`
  type User {
    id: Int!
    name: String!
    phone: String!
    avatar: String
    zoneId: String!
    posts(offset: Int): [Post]
    createdAt: String!
    updatedAt: String!

    isMe: Boolean!
    isFollowing: Boolean!
    zoneName: String!
    interestCount: Int!
    following: [User]!
    followerCount: Int!
    followingCount: Int!
    postsCount: Int!
    dealtCount: Int!
  }
`;
