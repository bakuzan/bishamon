import gql from 'graphql-tag';

export const noteCreate = gql`
  mutation noteCreate($text: String!) {
    noteCreate(text: $text) {
      id
      text
    }
  }
`;

export const noteUpdate = gql`
  mutation noteUpdate($id: Int!, $text: String!) {
    noteUpdate(id: $id, text: $text) {
      id
      text
    }
  }
`;

export const noteRemove = gql`
  mutation noteRemove($id: Int!) {
    noteRemove(id: $id) {
      success
      errorMessage
    }
  }
`;
