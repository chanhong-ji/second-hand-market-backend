import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    toggleInterest(id: Int!): MutationResult!
  }
`;
