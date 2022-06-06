import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    seeProfile(id: Int!, offset: Int): User
  }
`;
