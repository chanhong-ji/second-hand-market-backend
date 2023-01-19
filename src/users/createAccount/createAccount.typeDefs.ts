import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    createAccount(
      name: String!
      password: String!
      phone: String!
      zoneFirst: Int!
      zoneSecond: Int!
    ): MutationResult!
  }
`;
