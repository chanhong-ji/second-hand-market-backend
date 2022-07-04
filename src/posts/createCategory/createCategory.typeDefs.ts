import { gql } from 'apollo-server-core';

export default gql`
  type CreateCateogoryResult {
    ok: Boolean!
    count: Int!
  }
  type Mutation {
    createCategory: CreateCateogoryResult!
  }
`;
