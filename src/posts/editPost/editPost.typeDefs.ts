import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    editPost(
      id: Int!
      title: String
      caption: String
      categoryName: String
      price: Int
    ): MutationResult!
  }
`;
