import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    getDealtPost(id: Int!): MutationResult!
  }
`;
