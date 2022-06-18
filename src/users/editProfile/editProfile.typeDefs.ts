import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    editProfile(
      name: String
      password: String
      avatar: Upload
      zoneFirst: Int!
      zoneSecond: Int!
    ): MutationResult!
  }
`;
