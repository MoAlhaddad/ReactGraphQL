import {useQuery, useMutation, gql} from "@apollo/client";


 export const CREATE_USER =gql`
mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!){
  createUser(name: $name, age: $age, isMarried: $isMarried){
    id
    age
    name
    isMarried
  }
}
`
