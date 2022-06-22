import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    sendMessage(toUserId: Int!, payload: String!): MutationResult!
  }
`;
