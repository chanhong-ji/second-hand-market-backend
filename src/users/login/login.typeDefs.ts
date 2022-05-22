import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    login(phone: Int!, password: String!): MutationResult!
  }
`;
