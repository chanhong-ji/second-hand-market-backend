import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    seeInterests(offset: Int): [Interest]!
  }
`;
