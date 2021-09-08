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
        authors: String
        description: String
        bookId: String
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
        saveBook(_id: ID!, bookId: String!, title: String!, description: String!): User
        deleteBook(_id: ID!, bookId: String!): User
    }
`

module.exports = typeDefs