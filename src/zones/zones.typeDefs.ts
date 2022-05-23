import { gql } from 'apollo-server-core';

export default gql`
  type Zone {
    id: Int!
    name: String!
    countUser: Int!
    countPost: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
