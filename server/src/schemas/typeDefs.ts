const typeDefs = `
  type Book{
  authors: [String]
  description: String
  bookId: String
  image: String
  link: String
  title: String
}

type User{
  username: String
  email: String
  password: String
  savedBooks: [Book]
}

type Auth{
  token: String
  user: User
}

  type Query {
    getSingleUser: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth

    login(username: String, email: String, password: String!): Auth

    saveBook(
    bookId: String!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
    ): User

    deleteBook(bookId: String!): User
  }
`;

export default typeDefs;
