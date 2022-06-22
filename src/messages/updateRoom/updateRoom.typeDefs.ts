import { gql } from 'apollo-server-core';

export default gql`
  type Subscription {
    updateRoom(roomId: Int!): Message!
  }
`;
