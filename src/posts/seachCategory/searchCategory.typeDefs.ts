import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    searchCategory(keyword: String!, offset: Int!): [Category]
  }
`;
