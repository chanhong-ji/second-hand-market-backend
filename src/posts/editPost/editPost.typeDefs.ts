import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    editPost(
      id: Int!
      title: String
      caption: String
      categoryId: Int
      price: Int
    ): MutationResult!
  }
`;
