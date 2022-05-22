import { gql } from 'apollo-server-core';

export default gql`
  type Zone {
    name: String!
    countUser: Int!
    countPost: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
