import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    searchZone(keyword: String!, offset: Int): [Zone]
  }
`;
