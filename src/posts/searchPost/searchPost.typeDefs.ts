import { gql } from 'apollo-server-core';

export default gql`
  type SearchPostResult {
    totalResults: Int!
    posts: [Post]!
  }
  type Query {
    searchPost(
      keyword: String!
      zoneFirst: Int!
      zoneSecond: Int!
      page: Int
    ): SearchPostResult!
  }
`;
