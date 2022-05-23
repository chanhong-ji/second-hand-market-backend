import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    seePosts(zoneId: Int!, categoryId: Int, page: Int): [Post]
  }
`;
