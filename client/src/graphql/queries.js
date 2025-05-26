
import {useQuery, useMutation, gql} from "@apollo/client";

export const GET_USERS = gql`
query getUsers {
  getUsers {
   
    age,
    name,
    isMarried,
    position,
    photoUrl

  }
}

`
export const GET_USER = gql`
query getUserById($id: ID!) {
  getUserById(id: $id) {
    id
    age
    name
    isMarried
    position
    photoUrl
  }
}`
;