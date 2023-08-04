import gql from 'graphql-tag';

export const rootTypeDefs = gql`
  type Query {
    hello: String
  }
`;
