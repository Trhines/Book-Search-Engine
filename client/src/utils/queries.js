import { gql } from '@apollo/client'

export const GET_SINGLE_USER = gql`
    query getSingleUser($username: String!) {
        getSingleUser(username: $username) {
        _id
        username
        email
        password
        }
  }
`