import { gql } from '@apollo/client'

export const GET_SINGLE_USER = gql`
    query getSingleUser {
      getSingleUser{
        _id
        username
        email
        savedBooks {
          bookId
          authors
          description
          image
          link
          title
      }
    }
  }
`