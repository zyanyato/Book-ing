import { gql } from "@apollo/client";

export const GET_SINGLE_USER = gql`
query GetSingleUser {
  getSingleUser {
    email
    username
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;

export const GET_ME = gql`
  query GetMe {
    me {
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;