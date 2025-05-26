import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const UserForm = () => {
  const [newUser, setNewUser] = useState({});
  const [createUser] = useMutation(CREATE_USER);

  const handleCreate = () => {
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false,
      },
    });
  };

  return (
    <div>
      <input placeholder="Name..." onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))} />
      <input placeholder="Age..." type="number" onChange={(e) => setNewUser((prev) => ({ ...prev, age: e.target.value }))} />
      <button onClick={handleCreate}>Create User</button>
    </div>
  );
};

export default UserForm;
