
import { useState } from 'react';
import './App.css'
import {useQuery, useMutation, gql} from "@apollo/client";

const GET_USERS = gql`
query getUsers {
  getUsers {
   
    age,
    name,
    isMarried

  }
}

`
const GET_USER = gql`
query getUserById($id: ID!) {
  getUserById(id: $id) {
    id
    age
    name
    isMarried

  }
}`
;

const CREATE_USER =gql`
mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!){
  createUser(name: $name, age: $age, isMarried: $isMarried){
    id
    age
    name
    isMarried
  }
}
`

function App() {

  const [newUser, setUser] = useState({});

  const {data: getUsersData, error: getUsersError, loading: getUsersLoading} = useQuery(GET_USERS);
  const {data: getUserByIdData, error: getUserByIdError, loading: getUserByIdLoading} = useQuery(GET_USER, {
  variables: {id: "3"}
  });

  const [createUser] = useMutation(CREATE_USER)
  const handleCreateUser = async() => {
    console.log(newUser)
    createUser({variables: {name: newUser.name, age: Number(newUser.age), isMarried: false}})
  }

  if (getUsersLoading) return <p> Data loading....</p>

  if(getUsersError) return <p>{error.message}</p>;
 

  return (
    <>
  <div>
    <input placeholder="Name..." onChange={(e) => setUser((prev) => ({...prev, name: e.target.value}))}/>
    <input placeholder="Age..." type="number" onChange={(e) => setUser((prev) => ({...prev, age: e.target.value}))} />
    <button onClick={handleCreateUser}>Create User</button>
  </div>


      <h1>Users </h1>

<div>
  { getUserByIdLoading ? (<p>loading user....</p>) :(
<>
<h1>Chosen User: </h1>
<p>{getUserByIdData.getUserById.name}</p>
<p>{getUserByIdData.getUserById.age}</p>

</>)}
  
</div>
<h1>Users</h1>
      <div>
        {""}
{getUsersData.getUsers.map((user)  => (

  <div>
      <p>
        Name: {user.name}
      </p>
      <p>
        Married: {user.isMarried ? "Yes": "No" }
      </p>
      <p>
        age: {user.age}
      </p>
     
    </div>
))}
      </div>
    </>
  )
}

export default App
