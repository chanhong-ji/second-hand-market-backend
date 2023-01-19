import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    login(phone: String!, password: String!): MutationResult!
  }
`;
