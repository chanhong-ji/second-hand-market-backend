import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    createPost(
      title: String!
      caption: String!
      price: Int!
      photos: [Upload!]!
      categoryId: Int!
    ): MutationResult!
  }
`;
