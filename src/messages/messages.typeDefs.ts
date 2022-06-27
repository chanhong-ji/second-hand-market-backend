import { gql } from 'apollo-server-core';

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    userId: Int!
    room: Room!
    roomId: Int!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Room {
    id: Int!
    users: [User]!
    messages(offset: Int): [Message]!
    post: Post!
    postId: Int!
    createdAt: String!
    updatedAt: String!
    unreadTotal: Int!
  }
`;
