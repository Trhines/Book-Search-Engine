import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
        	user {
              username
              email
              password
            }
        }
  }
`

export const LOGIN = gql`
    mutation login($email: String, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($bookInfo: BookInput!){
      saveBook(bookInfo: $bookInfo) {
        savedBooks{
            bookId
            title
        }
        }
    }
`

export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            savedBooks {
                bookId
            }
        }
    }
`




// export const = gql``