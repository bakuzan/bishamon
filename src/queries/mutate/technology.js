import gql from 'graphql-tag';

export const technologyCreate = gql`
  mutation technologyCreate($name: String!) {
    technologyCreate(name: $name) {
      id
      name
    }
  }
`;
