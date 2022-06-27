import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    sendMessage(postId: Int!, payload: String!): MutationResult!
  }
`;
