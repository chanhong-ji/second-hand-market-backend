import { gql } from 'apollo-server-core';

export default gql`
  type UpdateResult {
    read: Boolean
    message: Message!
  }
  type Subscription {
    updateRoom(roomId: Int!): UpdateResult!
  }
`;
