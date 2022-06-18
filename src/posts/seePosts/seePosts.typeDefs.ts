import { gql } from 'apollo-server-core';

export default gql`
  type SeePostsResult {
    totalResults: Int!
    posts: [Post]!
  }
  type Query {
    seePosts(
      categoryName: String
      page: Int
      zoneFirst: Int!
      zoneSecond: Int!
    ): SeePostsResult!
  }
`;
