import gql from 'graphql-tag';

export const technologiesAll = gql`
  query technologiesAll {
    technologies {
      id
      name
    }
  }
`;
