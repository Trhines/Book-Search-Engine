const { gql } = require('@apollo/client')


 const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    input BookInput {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getSingleUser(username: String): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(username: String, email: String, password: String!): Auth
        saveBook(bookInfo: BookInput!): User
        deleteBook(bookId: String!): User
    }
`

module.exports = typeDefs