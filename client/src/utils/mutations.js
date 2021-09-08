import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            username
            email
            password
        }
  }
`

export const LOGIN = gql`
    mutation login($username: String, $email: String, $password: String!) {
        login(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($_id: ID!, $bookId: String!, $title: String!, $description: String!) {
        saveBook(_id: $_id, bookId: $bookId, title: $title, description: $description) {
            bookId
        }
    }
`

export const DELETE_BOOK = gql`
    mutation deleteBook($_id: ID!, $bookId: String!) {
        deleteBook(_id: $_id, bookId: $bookId) {
            bookId
        }
    }
`




// export const = gql``