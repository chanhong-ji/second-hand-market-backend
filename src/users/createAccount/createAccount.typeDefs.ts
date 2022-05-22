import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    createAccount(
      name: String!
      password: String!
      phone: Int!
    ): MutationResult!
  }
`;
