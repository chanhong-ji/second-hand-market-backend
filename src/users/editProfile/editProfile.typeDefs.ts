import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    editProfile(
      name: String
      password: String
      avatar: String
      zones: [String]
      posts: [String]
    ): MutationResult!
  }
`;
