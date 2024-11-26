import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      email
      username
    }
  }
}
`;

export const LOGIN_USER = gql`
mutation Login($password: String!, $email: String) {
  login(password: $password, email: $email) {
    token
    user {
      email
      username
    }
  }
}
`;

export const SAVE_BOOK = gql`
mutation SaveBook($bookId: String!, $authors: [String], $description: String, $title: String, $image: String, $link: String) {
  saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link) {
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

export const REMOVE_BOOK = gql`
mutation DeleteBook($bookId: String!) {
  deleteBook(bookId: $bookId) {
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
