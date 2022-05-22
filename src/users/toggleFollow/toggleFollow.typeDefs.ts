import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    toggleFollow(id: Int!): MutationResult!
  }
`;
